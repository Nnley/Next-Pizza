import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function GET(req: NextRequest) {
	try {
		const code = req.nextUrl.searchParams.get('code')
		if (!code) {
			return NextResponse.json({ message: 'Неверный код верификации' }, { status: 404 })
		}

		const verificationCode = await prisma.verificationCode.findFirst({
			where: {
				code,
			},
		})

		if (!verificationCode) {
			return NextResponse.json({ message: 'Неверный код верификации' }, { status: 404 })
		}

		await prisma.user.update({
			where: {
				id: verificationCode.userId,
			},
			data: {
				verified: new Date(),
			},
		})

		await prisma.verificationCode.delete({
			where: {
				id: verificationCode.id,
			},
		})

		return NextResponse.redirect(new URL('/?verified', req.url))
	} catch (error) {
		console.error('[GET VERIFY] Server error:', error)
	}
}