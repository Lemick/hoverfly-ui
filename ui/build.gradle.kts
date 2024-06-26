import com.github.gradle.node.npm.task.NpmTask

plugins {
    id("com.github.node-gradle.node") version "7.0.0"
}

node {
    download.set(true)
    version.set("20.12.2")
}

tasks.register("build", NpmTask::class) {
    args.set(setOf("run", "build"))
    dependsOn("npmInstall")
}

tasks.register("clean") {
    delete("build")
}
