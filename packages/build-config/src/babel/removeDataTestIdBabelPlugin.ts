import { PluginItem } from "@babel/core";

export const removeDataTestIdBabelPlugin = (): PluginItem => {
    return {
        visitor: {
            Program(path, state) {
                const props = state.opts.props ?? []

                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name
                        if (props.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    }
                })
            }
        }
    }
}