import fs from 'fs';


export interface ChainRef {
    /** PDB entry identifier or equivalent */
    entryId: string,
    /** ID of the assembly within entry to be processed (or `undefined` to process deposited model) */
    assemblyId: string | undefined,
    /** auth_asym_id of selected chain (or `undefined` to process all chains) */
    chainId: string | undefined,
}

export function loadInputDataset(file: string): ChainRef[] {
    const text = fs.readFileSync(file, { encoding: 'utf8' });
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#'));
    const result = [];
    for (const line of lines) {
        const [struct, chainId] = line.split(/[-,]/);
        const [entryId, assemblyId] = struct.split('_');
        result.push({ entryId, assemblyId, chainId });
    }
    return result;
}

/** Return filename for outputs (without file extension) */
export function createFilename(chainRef: ChainRef): string {
    const { entryId, assemblyId, chainId } = chainRef;
    let out = entryId;
    if (assemblyId) out += `_${assemblyId}`;
    if (chainId) out += `-${chainId}`;
    return out;
}
