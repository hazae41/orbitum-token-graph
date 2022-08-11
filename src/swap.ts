import { Address } from "@graphprotocol/graph-ts"
import { Pair, Swap } from "../generated/Token/Pair"
import { getDayFromBlock } from "./entities/day"

const alpha = Pair.bind(Address.fromString("0x0D64A856beb63b3f4FC5A98Eca51f757ffdA0BEd"))
const beta = Pair.bind(Address.fromString("0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827"))

export function handleSwap(event: Swap): void {
	const day = getDayFromBlock(event.block)

	const ralpha = alpha.getReserves()

	day.reserveAlphaMATIC = ralpha.get_reserve0()
	day.reserveAlphaORBTM = ralpha.get_reserve1()

	const rbeta = beta.getReserves()

	day.reserveBetaMATIC = rbeta.get_reserve0()
	day.reserveBetaUSDC = rbeta.get_reserve1()

	day.save()
}
