import { getUserSession } from '@/lib/get-user-session'
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function GET() {
	try {
		const user = await getUserSession()

		if (!user) {
			return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 })
		}

		const data = prisma.user.findFirst({
			where: {
				id: Number(user.id),
			},
			select: {
				fullName: true,
				email: true,
				password: false,
			},
		})

		return NextResponse.json(await data)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: '[USER_GET] Ошибка сервера' }, { status: 500 })
	}
}
