import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Day } from "../../generated/schema"
import { zero } from "../utils/bigint"

export function getDayFromBlock(block: ethereum.Block): Day {
	const date = new Date(block.timestamp.toI64() * 1000)
	date.setUTCSeconds(0)
	date.setUTCMinutes(0)
	date.setUTCHours(0)

	const id = date.getTime().toString()

	let day = Day.load(id)
	if (day) return day

	day = new Day(id)

	day.reserveAlphaMATIC = zero
	day.reserveAlphaORBTM = zero

	day.reserveBetaMATIC = zero
	day.reserveBetaUSDC = zero

	return day
}