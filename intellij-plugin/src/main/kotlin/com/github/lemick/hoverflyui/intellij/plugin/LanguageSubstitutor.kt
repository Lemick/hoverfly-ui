package com.github.lemick.hoverflyui.intellij.plugin

import com.intellij.lang.Language
import com.intellij.openapi.fileTypes.PlainTextLanguage
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.psi.LanguageSubstitutor

class LanguageSubstitutor : LanguageSubstitutor() {
    override fun getLanguage(file: VirtualFile, project: Project): Language? {
        val name = file.name
        if (name.endsWith(SimulationsFileType.INSTANCE.defaultExtension)) {
            return PlainTextLanguage.INSTANCE // JSON is a better choice, but has been extracted from 2024.3, need to find a way to use it with retro compatibility
        }
        return null
    }
}
