export type BuildPaths = {
    entry: string;
    output: string;
    html: string;
    src: string;
    public: string;
}

export type BuildMode = 'production' | 'development'
export type BuildPlatform = 'desktop' | 'mobile'

export type BuildOptions = {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    analyzer?: boolean;
    platform?: BuildPlatform;
}