import type {
    TitleComponentOption,
    LegendComponentOption,
    TooltipComponentOption,
    XAXisComponentOption,
    YAXisComponentOption,
    ToolboxComponentOption
} from 'echarts';
import * as components from 'echarts/components';

import { ECExtensions, EC, optionCreator } from './charts';

export function componentLoader(names: (keyof typeof components)[]) {
    return async (): Promise<ECExtensions> => {
        const components = await import('echarts/components');

        return names.map(name => components[name]);
    };
}

export type TitleProps = Omit<TitleComponentOption, 'text'>;
/**
 * @example
 * ```tsx
 * <Title>Hello, ECharts JSX!</Title>
 * ```
 */
export const Title: EC<TitleProps> = () => <></>;

Title.optionOf = ({ children, ...props }) => ({
    title: { ...props, text: children }
});

Title.loadModule = componentLoader(['TitleComponent']);

/**
 * @example
 * ```tsx
 * <Toolbox feature={{ saveAsImage: {} }} />
 * ```
 */
export const Toolbox: EC<ToolboxComponentOption> = () => <></>;

Toolbox.optionOf = optionCreator('toolbox');

Toolbox.loadModule = componentLoader(['ToolboxComponent']);

/**
 * @example
 * ```tsx
 * <Legend data={['sales']} />
 * ```
 */
export const Legend: EC<LegendComponentOption> = () => <></>;

Legend.optionOf = optionCreator('legend');

Legend.loadModule = componentLoader(['LegendComponent']);

/**
 * @example
 * ```tsx
 * <Tooltip />
 * ```
 */
export const Tooltip: EC<TooltipComponentOption> = () => <></>;

Tooltip.optionOf = optionCreator('tooltip');

Tooltip.loadModule = async () => {
    const [{ LabelLayout }, components] = await Promise.all([
        import('echarts/features'),
        componentLoader(['TooltipComponent'])()
    ]);
    return [LabelLayout, ...(components as any[])];
};

/**
 * @example
 * ```tsx
 * <XAxis
 *     data={['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']}
 * />
 * ```
 */
export const XAxis: EC<XAXisComponentOption> = () => <></>;

XAxis.optionOf = optionCreator('xAxis');

XAxis.loadModule = componentLoader(['GridComponent']);

/**
 * @example
 * ```tsx
 * <YAxis />
 * ```
 */
export const YAxis: EC<YAXisComponentOption> = () => <></>;

YAxis.optionOf = optionCreator('yAxis');

YAxis.loadModule = componentLoader(['GridComponent']);
