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
import org.cef.browser.CefFrame
import org.cef.handler.CefLoadHandlerAdapter
import org.cef.network.CefRequest
import java.beans.PropertyChangeListener
import java.util.Base64
import java.util.concurrent.atomic.AtomicBoolean
import javax.swing.JComponent

internal class SimulationsFileEditor(private val project: Project, private val file: VirtualFile) :
    UserDataHolderBase(), FileEditor {

    private val browser = JBCefBrowser()

    companion object {
        private const val JS_VAR_INITIAL_SIMULATION_DATA = "window.hoverflyUi_initialSimulationData"
        private const val JS_VAR_SET_UI_SIMULATION = "window.hoverflyUi_setUiSimulation"
        private const val JS_VAR_ON_UI_SIMULATION_CHANGE = "window.hoverflyUi_onUiSimulationChange"
    }

    init {
        val javascriptCallback = prepareJavascriptCallback()
        val isInitialized = AtomicBoolean(false)

        subscribeFileChanges()
        registerAppSchemeHandler()

        browser.jbCefClient.addLoadHandler(object : CefLoadHandlerAdapter() {
            override fun onLoadStart(
                cefBrowser: CefBrowser,
                frame: CefFrame?,
                transitionType: CefRequest.TransitionType?
            ) {
                if (isInitialized.compareAndSet(false, true)) {
                    cefBrowser.executeJavaScript(javascriptCallback, cefBrowser.url, 0)
                    setInitialContent()
                }
            }
        }, browser.cefBrowser)

        browser.loadURL("http://localhost/hoverfly-ui/index.html?plugin=true")
    }

    private fun prepareJavascriptCallback(): String {
        val jsCallback = JBCefJSQuery.create(browser as JBCefBrowserBase)
        jsCallback.addHandler { result ->
            WriteCommandAction.runWriteCommandAction(
                project,
                "Edit Simulations",
                null,
                { file.setBinaryContent(result.encodeToByteArray()) })
            JBCefJSQuery.Response("")
        }
        return "$JS_VAR_ON_UI_SIMULATION_CHANGE = function(simulationJson) { ${jsCallback.inject("simulationJson")} return true; }"
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
        return Base64.getEncoder().encodeToString(file.contentsToByteArray())
    }

    private fun setInitialContent() {
        browser.cefBrowser.executeJavaScript(
            "$JS_VAR_INITIAL_SIMULATION_DATA = '${getContent()}'",
            browser.cefBrowser.url,
            0
        )
    }

    private fun syncToEditor() {
        browser.cefBrowser.executeJavaScript("$JS_VAR_SET_UI_SIMULATION('${getContent()}')", browser.cefBrowser.url, 0)
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
        CefApp.getInstance()
            .registerSchemeHandlerFactory("http", "localhost") { _, _, _, _ -> StaticResourceHandler("hoverfly-ui") }
    }

}
