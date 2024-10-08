import fs from 'fs';


export interface ChainRef {
    /** PDB entry identifier or equivalent */
    entryId: string,
    /** auth_asym_id of selected chain (or `undefined` to process all chains) */
    chainId: string | undefined,
}

export function loadInputDataset(file: string): ChainRef[] {
    const text = fs.readFileSync(file, { encoding: 'utf8' });
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#'));
    const result = [];
    for (const line of lines) {
        const [entryId, chainId] = line.split(',');
        result.push({ entryId, chainId });
    }
    return result;
}
