export const importedSignatures = state => (state.aliases || []).filter(alias => alias.origin !== 'manual')
export const manualSignatures = state => (state.aliases || []).filter(alias => alias.origin === 'manual')
