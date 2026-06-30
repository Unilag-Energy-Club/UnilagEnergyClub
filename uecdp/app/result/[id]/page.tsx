import { notFound } from 'next/navigation'
import { getPocketBase, getFileUrl, DpGenerationRecord } from '@/lib/pocketbase'
import ResultClient from './ResultClient'

interface Props {
  params: { id: string }
}

// Records are created at runtime in PocketBase, so this page must render
// dynamically on every request. Without this it is statically optimized and
// 404s on a freshly created id until a full reload triggers on-demand render.
export const dynamic = 'force-dynamic'

export default async function ResultPage({ params }: Props) {
  const pb = getPocketBase()

  let record: DpGenerationRecord

  try {
    record = await pb
      .collection('dp_generations')
      .getOne<DpGenerationRecord>(params.id)
  } catch {
    notFound()
  }

  const dpUrl = getFileUrl(record, record.generated_dp)

  return <ResultClient name={record.name} dpUrl={dpUrl} recordId={record.id} />
}
