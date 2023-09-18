package com.github.lemick.hoverflyui.intellij.plugin

import org.cef.callback.CefCallback
import org.cef.handler.CefLoadHandler
import org.cef.handler.CefResourceHandler
import org.cef.misc.IntRef
import org.cef.misc.StringRef
import org.cef.network.CefRequest
import org.cef.network.CefResponse
import java.io.IOException
import java.io.InputStream
import java.net.URLConnection

class StaticResourceHandler(private val resourceBaseUrl: String, private val staticBaseUrl: String? = null) : CefResourceHandler {

    private var state: ResourceHandlerState = ClosedConnection

    override fun processRequest(cefRequest: CefRequest, cefCallback: CefCallback): Boolean {
        val url = cefRequest.url
        return if (url != null) {
            val pathToResource = url.replace("http://localhost/${resourceBaseUrl}", staticBaseUrl ?: resourceBaseUrl)
            val newUrl: URLConnection = javaClass.getClassLoader().getResource(pathToResource)!!.openConnection()
            state = OpenedConnection(newUrl)
            cefCallback.Continue()
            true
        } else {
            false
        }
    }

    override fun getResponseHeaders(cefResponse: CefResponse, responseLength: IntRef, redirectUrl: StringRef) {
        state.getResponseHeaders(cefResponse, responseLength, redirectUrl)
    }

    override fun readResponse(dataOut: ByteArray, designedBytesToRead: Int, bytesRead: IntRef, callback: CefCallback): Boolean {
        return state.readResponse(dataOut, designedBytesToRead, bytesRead, callback)
    }

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

        fun readResponse(
            dataOut: ByteArray,
            designedBytesToRead: Int,
            bytesRead: IntRef,
            callback: CefCallback
        ): Boolean

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

        override fun readResponse(
            dataOut: ByteArray,
            designedBytesToRead: Int,
            bytesRead: IntRef,
            callback: CefCallback
        ): Boolean {
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

        override fun readResponse(
            dataOut: ByteArray,
            designedBytesToRead: Int,
            bytesRead: IntRef,
            callback: CefCallback
        ): Boolean {
            return false
        }
    }
}
