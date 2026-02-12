'use client';

export default function ModelViewer({ modelUrl }: { modelUrl?: string }) {
    if (!modelUrl) return null;

    return (
        <div className="w-full h-full bg-neutral-100 relative">
            <iframe
                title="3D Model"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={modelUrl}
            />
        </div>
    );
}
