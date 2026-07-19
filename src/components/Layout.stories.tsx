import type { Meta, StoryObj } from "@storybook/react-vite"

import { Card, CardDescription, CardHeader, CardTitle } from "./card"
import { ImageCard } from "./ImageCard"
import {
    CardGrid,
    PageLane,
    Section,
    SectionIntro,
} from "./layout"

const meta = {
    title: "Layout/Primitives",
    component: PageLane,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        width: 10,
        children: <LaneSample label="Centered 10-column lane" />,
    },
    argTypes: {
        children: {
            control: false,
        },
        className: {
            control: false,
        },
        width: {
            control: "radio",
            options: [8, 10, 12],
        },
    },
} satisfies Meta<typeof PageLane>

export default meta
type Story = StoryObj<typeof meta>

function LaneSample({ label }: { label: string }) {
    return (
        <div className="rounded-lg border border-dashed border-primary/50 bg-primary/10 p-5 text-sm font-medium text-foreground">
            {label}
        </div>
    )
}

export const PageLanePlayground: Story = {
    args: {
        width: 10,
        children: <LaneSample label="Centered 10-column lane" />,
    },
    render: (args) => (
        <div className="py-8">
            <PageLane {...args} />
        </div>
    ),
}

export const LaneWidths: Story = {
    render: () => (
        <div className="grid gap-8 py-8">
            {([8, 10, 12] as const).map((width) => (
                <PageLane key={width} width={width}>
                    <LaneSample label={`${width}-column lane`} />
                </PageLane>
            ))}
        </div>
    ),
}

export const SectionIntroBlock: Story = {
    render: () => (
        <PageLane width={10}>
            <div className="py-8">
                <SectionIntro
                    title="Featured components"
                    description="A heading and supporting description with a readable maximum line length."
                />
            </div>
        </PageLane>
    ),
}

export const SectionAndGrid: Story = {
    render: () => (
        <PageLane width={10}>
            <div className="py-10">
                <Section
                    id="component-grid"
                    title="Component grid"
                    description="CardGrid moves from one column to the selected desktop column count."
                >
                    <CardGrid columns={3}>
                        {["Navigation", "Search", "Publishing"].map((title, index) => (
                            <ImageCard
                                key={title}
                                icon={(["compass", "search", "send"] as const)[index]}
                                iconPosition="left"
                                title={title}
                                body="A stable card layout inside the responsive grid."
                            />
                        ))}
                    </CardGrid>
                </Section>
            </div>
        </PageLane>
    ),
}

export const GridColumns: Story = {
    render: () => (
        <PageLane width={12}>
            <div className="grid gap-10 py-10">
                {([2, 3, 4] as const).map((columns) => (
                    <Section key={columns} title={`${columns} columns`}>
                        <CardGrid columns={columns}>
                            {Array.from({ length: columns }, (_, index) => (
                                <Card key={index} size="sm">
                                    <CardHeader>
                                        <CardTitle>Card {index + 1}</CardTitle>
                                        <CardDescription>{columns}-column layout</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </CardGrid>
                    </Section>
                ))}
            </div>
        </PageLane>
    ),
}
