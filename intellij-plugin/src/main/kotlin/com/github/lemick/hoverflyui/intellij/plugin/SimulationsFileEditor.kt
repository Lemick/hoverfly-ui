package com.github.lemick.hoverflyui.intellij.plugin

import com.intellij.openapi.command.WriteCommandAction
import com.intellij.openapi.fileEditor.FileEditor
import com.intellij.openapi.fileEditor.FileEditorState
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.UserDataHolderBase
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.openapi.vfs.VirtualFileManager
import com.intellij.openapi.vfs.newvfs.BulkFileListener
import com.intellij.openapi.vfs.newvfs.events.VFileEvent
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.jcef.JBCefBrowserBase
import com.intellij.ui.jcef.JBCefJSQuery
import org.cef.CefApp
import org.cef.browser.CefBrowser
import org.cef.handler.CefLoadHandlerAdapter
import java.beans.PropertyChangeListener
import javax.swing.JComponent

internal class SimulationsFileEditor(private val project: Project, private val file: VirtualFile) : UserDataHolderBase(), FileEditor {

    private val browser = JBCefBrowser()

    init {

        val javascriptCallback = prepareJavascriptCallback()

        subscribeFileChanges()

        registerAppSchemeHandler()

        browser.loadURL("http://localhost/hoverfly-ui/index.html")

        browser.jbCefClient.addLoadHandler(object : CefLoadHandlerAdapter() {
            override fun onLoadingStateChange(cfeBrowser: CefBrowser, isLoading: Boolean, canGoBack: Boolean, canGoForward: Boolean) {
                setInitialContent()
                browser.cefBrowser.executeJavaScript(javascriptCallback, browser.cefBrowser.url, 0)
            }
        }, browser.cefBrowser)
    }

    private fun prepareJavascriptCallback(): String {
        val jsCallback = JBCefJSQuery.create(browser as JBCefBrowserBase)
        jsCallback.addHandler { result ->
            WriteCommandAction.runWriteCommandAction(project, "Edit Simulations", null, { file.setBinaryContent(result.encodeToByteArray()) })
            JBCefJSQuery.Response("")
        }
        return "window.simulationsUpdated = function(param) { ${jsCallback.inject("param")} return true; }"
    }

    private fun subscribeFileChanges() {
        project.messageBus.connect().subscribe<BulkFileListener>(VirtualFileManager.VFS_CHANGES,
            object : BulkFileListener {
                override fun after(events: List<VFileEvent>) {
                    events.filter { e ->
                        e.file == file
                    }.forEach { _ ->
                        syncToEditor()
                    }
                }
            })
    }

    private fun getContent(): String {
        return String(file.contentsToByteArray())
            .replace("\"", "\\\"") // Escape double quotes
            .replace("'", "\\'") // Escape single quotes
            .replace("\n", "\\\n") // Escape "real" EOL of file
            .replace("\\n", "\\\\n") // Escape already escaped EOL from embedded JSON
    }

    private fun setInitialContent() {
        browser.cefBrowser.executeJavaScript("window.initialSimulations = '" + getContent() + "'", browser.cefBrowser.url, 0)
    }

    private fun syncToEditor() {
        browser.cefBrowser.executeJavaScript("window.setSimulations('" + getContent() + "')", browser.cefBrowser.url, 0)
    }

    override fun getFile(): VirtualFile = file
    override fun getComponent(): JComponent = browser.component
    override fun getPreferredFocusedComponent(): JComponent = browser.component
    override fun getName(): String = "Hoverfly"
    override fun setState(state: FileEditorState) {}
    override fun isModified(): Boolean = false
    override fun isValid(): Boolean = true
    override fun addPropertyChangeListener(listener: PropertyChangeListener) {}
    override fun removePropertyChangeListener(listener: PropertyChangeListener) {}
    override fun dispose() {
        browser.dispose()
    }

    private fun registerAppSchemeHandler() {
        CefApp.getInstance().registerSchemeHandlerFactory("http", "localhost") { _, _, _, _ -> StaticResourceHandler("hoverfly-ui") }
    }
}
