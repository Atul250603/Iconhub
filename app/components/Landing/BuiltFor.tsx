"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Building2, Video } from "lucide-react";
import { motion } from "motion/react";
export default function BuiltFor() {
    const builtFor = [
        {
            name: "Designers",
            description: "Designers can use Iconhub to find and customize icons for their projects without having to download the icons and then customize them.",
            icon: Palette
        },
        {
            name: "Developers",
            description: "Developers can use Iconhub to get the icons in a clean and ready to use format.",
            icon: Code
        },
        {
            name: "Brands",
            description: "Brands can use Iconhub to maintain their brand consistency and consistency across their projects.",
            icon: Building2
        },
        {
            name: "Content Creators",
            description: "Content creators can quickly customize icons for thumbnails, social media posts, and graphics without design tools.",
            icon: Video
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut'}}
            className="my-20"
        >
            <div className="text-4xl md:text-5xl font-bold text-center mb-10">
                Built For Everyone
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {builtFor.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex items-center gap-3">
                                        <IconComponent className="w-6 h-6" />
                                        <div className="text-xl font-bold">
                                            {item.name}
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </motion.div>
    )
}