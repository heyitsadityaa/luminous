import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'

const InsightCard = ({ cardHeader, cardDescription, className }: { cardHeader: string, cardDescription: string, className?: string }) => {
    return (
        <Card className={cn("aspect-square max-w-3xs", className)}>
            <CardHeader className='text-lg font-semibold'>{cardHeader}</CardHeader>
            <CardDescription>
                <CardContent>
                    {cardDescription}
                </CardContent>
            </CardDescription>
        </Card>
    )
}

export default InsightCard
