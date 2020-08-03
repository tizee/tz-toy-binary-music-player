const pitch_names = "CDEFGAB".split("");
const pitch_ids: Record<string, number> = {};
pitch_names.forEach((el, idx) => {
    pitch_ids[el] = idx;
});

/**
 * half step: E and F, B and C
 */
const nextNote = (note: string): string => {
    if (note.startsWith("E")) {
        if (note.startsWith("E")) {
            return note.replace("E", "F");
        }
    }
    const tokens = note.split("#");
    const hasSharp = tokens.length > 1;
    // two element [xx]#[number]
    if (hasSharp) {
        // two elements
        const [pitchName, pitch] = tokens;
        const next = pitch_names[(pitch_ids[pitchName] + 1) % 7];
        return next + pitch;
    }
    // one element [xx]
    const [pitchName, pitch] = tokens[0].split("");
    const next = pitch_names[(pitch_ids[pitchName] + 1) % 7];
    if (next === "C") {
        return next + (Number.parseInt(pitch) + 1).toString();
    }
    return pitchName + "#" + pitch;
};

const notes = ["C4"];

while (notes.length <= 21) {
    const next = nextNote(notes[notes.length - 1]);
    notes.push(next);
}

export { notes };
