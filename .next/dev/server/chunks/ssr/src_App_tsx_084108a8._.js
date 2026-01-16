module.exports = [
"[project]/src/App.tsx [ssr] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_085b36c8._.js",
  "server/chunks/ssr/[root-of-the-server]__a66b4b73._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/App.tsx [ssr] (ecmascript, next/dynamic entry)");
    });
});
}),
];