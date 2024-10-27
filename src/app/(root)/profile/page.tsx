import { ProfileForm } from '@/components/shared/profile-form'
import { getUserSession } from '@/lib/get-user-session'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../prisma/prisma-client'

export default async function ProfilePage() {
	const session = await getUserSession()

	if (!session) return redirect('/not-auth')

	const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })

	if (!user) return redirect('/not-auth')

	return <ProfileForm data={user} />
}
