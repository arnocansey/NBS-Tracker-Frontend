module.exports = [
"[project]/src/App.tsx [ssr] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_components_HospitalDiscovery_tsx_d39bae09._.js",
  "server/chunks/ssr/src_bc686d17._.js",
  "server/chunks/ssr/[root-of-the-server]__53469ab3._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/App.tsx [ssr] (ecmascript, next/dynamic entry)");
    });
});
}),
];