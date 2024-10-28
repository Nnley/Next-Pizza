import { Container } from '@/components/shared'
import { ProfileForm } from '@/components/shared/profile-form'
import { ProfileOrders } from '@/components/shared/profile-orders'
import { getUserSession } from '@/lib/get-user-session'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../prisma/prisma-client'

export default async function ProfilePage() {
	const session = await getUserSession()

	if (!session) return redirect('/not-auth')

	const user = await prisma.user.findFirst({ where: { id: Number(session?.id) }, include: { orders: true } })

	if (!user) return redirect('/not-auth')

	return (
		<Container className='flex gap-32'>
			<ProfileForm data={user} />
			<ProfileOrders data={user} className='w-full' />
		</Container>
	)
}
