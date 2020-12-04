import loadInput from "../utils/loadInput";

const testInput = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

(async () => {
    // const input = await loadInput(2);
    // console.log(input);


    console.log(
        parseInput(
            // testInput
            await loadInput(2)
        )
            .filter(validatePassword)
            .length
    )
})();

interface PasswordPolicy {
    raw?: string,
    character: string
    positions: number[],
}

function parseInput(input: string): { password: string, policy: PasswordPolicy }[] {
    const lines = input.split('\n');

    return lines.filter(Boolean).map((line: string) => {
        const [policy, password] = line.split(': ');
        const [range, character] = policy.split(' ');

        return {
            password,
            policy: {
                raw: policy,
                character,
                positions: range.split('-').map(n => parseInt(n) - 1),
            },
        };
    })
}


function validatePassword({ password, policy }: { password: string, policy: PasswordPolicy }): boolean {
    return policy.positions
        .map(pos => password[pos])
        .filter(letter => letter === policy.character)
        .length === 1;
}