fun Project.localGradleProperty(name: String): Provider<String> = provider {
    if (hasProperty(name)) property(name)?.toString() else null
}

fun environment(key: String) = project.providers.environmentVariable(key)

plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm") version "1.9.24"
    id("org.jetbrains.intellij") version "1.17.3"
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

tasks.jar {
    dependsOn(copyUi)
}

tasks.instrumentedJar {
    dependsOn(copyUi)
}

tasks {
    buildSearchableOptions {
        enabled = false
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
        token.set(System.getenv("PUBLISH_TOKEN"))

        // The pluginVersion is based on the SemVer (https://semver.org) and supports pre-release labels, like 2.1.7-alpha.3
        // Specify pre-release label to publish the plugin in a custom Release Channel automatically. Read more:
        // https://plugins.jetbrains.com/docs/intellij/deployment.html#specifying-a-release-channel
        channels = listOf(pluginVersion.split('-').getOrElse(1) { "default" }.split('.').first())
    }
}
