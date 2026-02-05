import { prisma } from "../../lib/prisma"

const createBusSeat = async (payload: {seatNumber: string}) => {
    const busSeat = await prisma.busSeat.createMany({
        data:payload })
    return busSeat;
}

const getAllBusSeat = async () => {
    const busSeat = await prisma.busSeat.findMany()
    return busSeat;
}


export const busServices = {
    createBusSeat,
    getAllBusSeat
}