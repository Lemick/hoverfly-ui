package com.github.lemick.hoverflyui.intellij.plugin

import com.intellij.lang.Language

internal class Language : Language("Hoverfly", "text/x-hoverfly") {
    companion object {
        val INSTANCE: com.github.lemick.hoverflyui.intellij.plugin.Language = Language()
    }
}
