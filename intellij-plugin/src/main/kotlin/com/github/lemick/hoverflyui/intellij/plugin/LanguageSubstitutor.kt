package com.github.lemick.hoverflyui.intellij.plugin

import com.intellij.json.JsonLanguage
import com.intellij.lang.Language
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.psi.LanguageSubstitutor

class LanguageSubstitutor : LanguageSubstitutor() {
    override fun getLanguage(file: VirtualFile, project: Project): Language? {
        val name = file.name
        if (name.endsWith(SimulationsFileType.INSTANCE.defaultExtension)) {
            return JsonLanguage.INSTANCE
        }
        return null
    }
}