"use client"

import { RefreshCw, ExternalLink } from "lucide-react"
import { useState } from "react"

export function PreviewPane() {
  const [key, setKey] = useState(0)

  const reload = () => setKey(prev => prev + 1)

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-10 items-center justify-between border-b border-gray-200 bg-gray-50 px-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded w-full max-w-md">
          <span className="text-green-600">🔒</span>
          <span>localhost:3000</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reload} className="p-1.5 text-gray-500 hover:bg-gray-200 rounded">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded">
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white relative">
        <iframe
          key={key}
          srcDoc={`
            <html>
              <head>
                <script src="https://cdn.tailwindcss.com"></script>
              </head>
              <body class="bg-slate-50 flex items-center justify-center h-screen flex-col gap-4">
                <h1 class="text-4xl font-bold text-[#708F96]">Preview Mode</h1>
                <p class="text-[#AA895F]">Generated output will appear here.</p>
                <button class="bg-[#708F96] text-white px-4 py-2 rounded shadow">Click Me</button>
              </body>
            </html>
          `}
          className="h-full w-full border-0"
          title="Preview"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}