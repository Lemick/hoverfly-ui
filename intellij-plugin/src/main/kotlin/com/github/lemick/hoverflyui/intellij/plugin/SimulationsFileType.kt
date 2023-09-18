package com.github.lemick.hoverflyui.intellij.plugin

import com.intellij.openapi.fileTypes.LanguageFileType
import org.jetbrains.annotations.Nls
import javax.swing.Icon

class SimulationsFileType : LanguageFileType(Language.INSTANCE) {

    companion object {
        val INSTANCE: SimulationsFileType = SimulationsFileType()
    }

    override fun getName(): String {
        return "Hoverfly"
    }

    override fun getDescription(): String {
        return "Hoverfly simulations"
    }

    @Nls
    override fun getDisplayName(): String {
        return "Hoverfly simulations"
    }

    override fun getDefaultExtension(): String {
        return "hfy"
    }

    override fun getIcon(): Icon {
        return Icons.FILE
    }

}
