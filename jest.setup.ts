/* eslint-disable @typescript-eslint/no-explicit-any */

// Fix: Expo SDK 54 "winter runtime" instala um getter lazy para `structuredClone`
// que tenta carregar @ungap/structured-clone via jest-runtime fora do escopo de teste.
// Pré-definindo como valor concreto o getter nunca é acionado.
if (typeof (globalThis as any).structuredClone !== "function") {
  (globalThis as any).structuredClone = (val: unknown) =>
    JSON.parse(JSON.stringify(val));
}

// Garante que __ExpoImportMetaRegistry exista antes do installGlobal do Expo
if (!(globalThis as any).__ExpoImportMetaRegistry) {
  Object.defineProperty(globalThis, "__ExpoImportMetaRegistry", {
    value: new Map(),
    writable: true,
    configurable: true,
  });
}
