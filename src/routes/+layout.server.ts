import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
    const { cms } = locals
    return { cms }
}