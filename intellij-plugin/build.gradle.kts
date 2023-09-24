import org.jetbrains.changelog.Changelog

fun Project.localGradleProperty(name: String): Provider<String> = provider {
    if (hasProperty(name)) property(name)?.toString() else null
}

fun environment(key: String) = project.providers.environmentVariable(key)

plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm") version "1.9.0"
    id("org.jetbrains.intellij") version "1.15.0"
    id("org.jetbrains.changelog") version "2.2.0"
}

val pluginVersion: String = localGradleProperty("pluginVersion").get()

group = localGradleProperty("pluginGroup").get()
version = pluginVersion

repositories {
    mavenCentral()
}

intellij {
    pluginName = localGradleProperty("pluginName")
    version = localGradleProperty("platformVersion")
    type = localGradleProperty("platformType")

    // Plugin Dependencies. Uses `platformPlugins` property from the gradle.properties file.
    plugins = localGradleProperty("platformPlugins").map { it.split(',').map(String::trim).filter(String::isNotEmpty) }
}

val copyUi = tasks.register("copyUi", Copy::class) {
    from("$rootDir/ui/build")
    into("$rootDir/intellij-plugin/build/resources/main/hoverfly-ui")
    dependsOn("::ui:build")
}

changelog {
    groups.empty()
    repositoryUrl = localGradleProperty("pluginRepositoryUrl")
}

tasks.jar {
    dependsOn(copyUi)
}

tasks.instrumentedJar {
    dependsOn(copyUi)
}

tasks {
    val changelog = project.changelog // local variable for configuration cache compatibility

    buildSearchableOptions {
        enabled = false
    }

    // Get the latest available change notes from the changelog file
    with(changelog) {
        renderItem(
            (getOrNull(version.get()) ?: getUnreleased())
                .withHeader(false)
                .withEmptySections(false),
            Changelog.OutputType.HTML,
        )
    }


    // Set the JVM compatibility versions
    withType<JavaCompile> {
        sourceCompatibility = "17"
        targetCompatibility = "17"
    }

    withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        kotlinOptions.jvmTarget = "17"
    }

    patchPluginXml {
        sinceBuild.set(localGradleProperty("pluginSinceBuild").get())
        untilBuild.set(localGradleProperty("pluginUntilBuild").get())
    }

    signPlugin {
        certificateChain.set(System.getenv("CERTIFICATE_CHAIN"))
        privateKey.set(System.getenv("PRIVATE_KEY"))
        password.set(System.getenv("PRIVATE_KEY_PASSWORD"))
    }

    publishPlugin {
        dependsOn("patchChangelog")
        token.set(System.getenv("PUBLISH_TOKEN"))

        // The pluginVersion is based on the SemVer (https://semver.org) and supports pre-release labels, like 2.1.7-alpha.3
        // Specify pre-release label to publish the plugin in a custom Release Channel automatically. Read more:
        // https://plugins.jetbrains.com/docs/intellij/deployment.html#specifying-a-release-channel
        channels = listOf(pluginVersion.split('-').getOrElse(1) { "default" }.split('.').first())
    }
}
