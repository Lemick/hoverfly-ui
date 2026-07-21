package com.github.lemick.hoverflyui.intellij.plugin

import org.cef.callback.CefCallback
import org.cef.callback.CefResourceReadCallback
import org.cef.callback.CefResourceSkipCallback
import org.cef.handler.CefLoadHandler
import org.cef.handler.CefResourceHandler
import org.cef.misc.BoolRef
import org.cef.misc.IntRef
import org.cef.misc.LongRef
import org.cef.misc.StringRef
import org.cef.network.CefRequest
import org.cef.network.CefResponse
import java.io.IOException
import java.io.InputStream
import java.net.URLConnection

class StaticResourceHandler(private val resourceBaseUrl: String, private val staticBaseUrl: String? = null) : CefResourceHandler {

    private var state: ResourceHandlerState = ClosedConnection

    @Deprecated("Required by the JCEF interface; use open instead")
    override fun processRequest(cefRequest: CefRequest, callback: CefCallback): Boolean {
        val opened = open(cefRequest, BoolRef(true), callback)
        if (opened) callback.Continue()
        return opened
    }

    override fun open(cefRequest: CefRequest, handleRequest: BoolRef, callback: CefCallback): Boolean {
        handleRequest.set(true)
        val url = cefRequest.url
        return if (url != null) {
            val pathToResource = url.replace("http://localhost/${resourceBaseUrl}", staticBaseUrl ?: resourceBaseUrl)
            val pathToResourceWithoutQueryParams  = pathToResource.split("?")[0]
            val newUrl: URLConnection = javaClass.getClassLoader().getResource(pathToResourceWithoutQueryParams)!!.openConnection()
            state = OpenedConnection(newUrl)
            true
        } else {
            false
        }
    }

    override fun getResponseHeaders(cefResponse: CefResponse, responseLength: IntRef, redirectUrl: StringRef) {
        state.getResponseHeaders(cefResponse, responseLength, redirectUrl)
    }

    @Deprecated("Required by the JCEF interface; use read instead")
    override fun readResponse(
        dataOut: ByteArray,
        designedBytesToRead: Int,
        bytesRead: IntRef,
        callback: CefCallback
    ): Boolean = state.read(dataOut, designedBytesToRead, bytesRead)

    override fun read(
        dataOut: ByteArray,
        designedBytesToRead: Int,
        bytesRead: IntRef,
        callback: CefResourceReadCallback
    ): Boolean = state.read(dataOut, designedBytesToRead, bytesRead)

    override fun skip(bytesToSkip: Long, bytesSkipped: LongRef, callback: CefResourceSkipCallback): Boolean =
        state.skip(bytesToSkip, bytesSkipped)

    override fun cancel() {
        state.close()
        state = ClosedConnection
    }

    interface ResourceHandlerState {
        fun getResponseHeaders(
            cefResponse: CefResponse,
            responseLength: IntRef,
            redirectUrl: StringRef
        )

        fun read(dataOut: ByteArray, designedBytesToRead: Int, bytesRead: IntRef): Boolean

        fun skip(bytesToSkip: Long, bytesSkipped: LongRef): Boolean

        fun close() {}
    }

    class OpenedConnection(connection: URLConnection) : ResourceHandlerState {
        private val connection: URLConnection
        private val inputStream: InputStream

        init {
            this.connection = connection
            inputStream = connection.getInputStream()
        }

        override fun getResponseHeaders(
            cefResponse: CefResponse,
            responseLength: IntRef,
            redirectUrl: StringRef
        ) {
            try {
                val url: String = connection.getURL().toString()
                if (url.contains(".css")) {
                    cefResponse.mimeType = "text/css"
                } else if (url.contains(".js")) {
                    cefResponse.mimeType = "text/javascript"
                } else if (url.contains(".html")) {
                    cefResponse.mimeType = "text/html"
                } else {
                    cefResponse.mimeType = connection.getContentType()
                }
                responseLength.set(inputStream.available())
                cefResponse.status = 200
            } catch (e: IOException) {
                cefResponse.error = CefLoadHandler.ErrorCode.ERR_FILE_NOT_FOUND
                cefResponse.statusText = e.localizedMessage
                cefResponse.status = 404
            }
        }

        override fun read(dataOut: ByteArray, designedBytesToRead: Int, bytesRead: IntRef): Boolean {
            val availableSize = inputStream.available()
            return if (availableSize > 0) {
                val maxBytesToRead = Math.min(availableSize, designedBytesToRead)
                val realNumberOfReadBytes =
                    inputStream.read(dataOut, 0, maxBytesToRead)
                bytesRead.set(realNumberOfReadBytes)
                true
            } else {
                inputStream.close()
                false
            }
        }

        override fun skip(bytesToSkip: Long, bytesSkipped: LongRef): Boolean {
            val skipped = inputStream.skip(bytesToSkip)
            bytesSkipped.set(skipped)
            return skipped > 0
        }

        override fun close() {
            inputStream.close()
        }
    }

    object ClosedConnection : ResourceHandlerState {
        override fun getResponseHeaders(
            cefResponse: CefResponse,
            responseLength: IntRef,
            redirectUrl: StringRef
        ) {
            cefResponse.status = 404
        }

        override fun read(dataOut: ByteArray, designedBytesToRead: Int, bytesRead: IntRef): Boolean = false

        override fun skip(bytesToSkip: Long, bytesSkipped: LongRef): Boolean = false
    }
}
