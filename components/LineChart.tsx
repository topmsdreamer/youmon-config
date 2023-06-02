import React from "react";
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLine, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
import moment from "moment";
import { Circle, G, Line, Text as SvgText, } from "react-native-svg";
import * as _ from 'lodash';

const ValueBox = (props: any) => {
  const { name, lastX, lastY, currentX, currentY, unit } = props

  const date = currentX ? moment(currentX).format('ddd MMM D YYYY HH:mm:ss') : lastX ? moment(lastX).format('ddd MMM D YYYY HH:mm:ss') : moment().format('ddd MMM D YYYY HH:mm:ss');
  const value = currentY ? currentY.toFixed(2) : lastY ? lastY : ''
  const u = unit && value ? unit : ''

  return <G x={10} y={40}>
    <SvgText
      y={0}
      fontSize={16}
      fontWeight="bold"
      fill={currentX ? '#bf2c37' : '#192a46'}>
      {date}
    </SvgText>
    <SvgText
      y={25}
      fontSize={20}
      fontWeight="bold"
      fill="rgba(0, 0, 0, 1)">
      {name}
    </SvgText>
    <SvgText
      y={50}
      fontSize={20}
      fontWeight="bold"
      fill={currentY ? '#bf2c37' : '#192a46'}>
      {value} {u}
    </SvgText>
  </G>
}

class CustomFlyout extends React.Component<any> {
  componentDidMount() {
    const { name, datum, value, onChange } = this.props;

    if (onChange) {
      const data = Object.assign({}, value, { currentY: datum.y, currentX: datum.x });
      onChange(name, data)
    }
  }
  componentWillUnmount() {
    const { name, datum, value, onChange } = this.props;
    if (onChange) {
      onChange(name, Object.assign({}, value, { currentY: undefined, currentX: undefined }))
    }
  }
  render() {
    
    const { x, y, height,datum }: any = this.props;
    const g = <G x={x}>
      <Line
        y1={100}
        y2={height}
        stroke="#ccc"
        strokeWidth={2}
        strokeDasharray={[6, 3]}
      />
      <Circle
        cy={y}
        r={5}
        stroke="#fff"
        strokeWidth={2}
        fill="#bf2c37"
      />
    </G>
    return g;
  }
}

interface ILineChartProps {
  name: string;
  data: any[];
  options: {
    height: number;
    min: number;
    max: number;
    unit?: string;
  }
}

interface ILineChartValue {
  lastY: string;
  lastX: string;
  currentY?: string;
  currentX?: string;
}

interface ILineChartState {
  value?: ILineChartValue
}

export class LineChart extends React.Component<ILineChartProps, ILineChartState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      value: undefined
    }
  }

  componentDidMount() {
    const { data } = this.props;
    const lastPoint = data.length > 0 ? data[data.length - 1] : undefined
    const lastY = lastPoint ? lastPoint.y.toFixed(2) : '';
    const lastX = lastPoint ? lastPoint.x : moment().toDate().getTime();
    const value = { lastX: lastX, lastY: lastY, currentX: undefined, currentY: undefined };
    this.setState({ value: value });

  }

  _onFlyoutChange = (name: string, props: any) => {
    this.setState((prevState: any) => {
      return {
        ...prevState.value,
        value: props
      }
    })
  }

  _getTickFormat = (value: any, index: number, ticks: any) => {

    const { data } = this.props;
    const selectedStartDate = data.length > 0 ? moment(data[0].x).startOf('day') : moment().add('-1', 'day').startOf('day');
    const selectedEndDate = data.length > 0 ? moment(data[data.length - 1].x).endOf('day') : moment().endOf('day');
    const numberOfDays = selectedEndDate.diff(selectedStartDate, 'days') + 1

    if (numberOfDays === 1) {
      return moment(value).format('HH:mm')
    }
    else if (numberOfDays <= 3) {
      return index === 0 || index === ticks.length - 1 ? moment(value).format('DD MMM') : moment(value).format('HH:mm')
    }
    else {
      return moment(value).format('DD MMM')
    }
  }

  render() {
    const { data, options, name } = this.props;
    const { value } = this.state;
    const chartHeight = options.height;

    const minDomain = options?.min !== undefined ? { minDomain: { y: options.min } } : {}
    const maxDomain = options?.max !== undefined ? { maxDomain: { y: options.max } } : {};

    const domain = Object.assign({}, minDomain, maxDomain);

    return <>
      {data && data.length > 0 && <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
          voronoiDimension="x"
            labels={({ datum }) => { return ' ' }}
            labelComponent={(
              <VictoryTooltip
                flyoutComponent={<CustomFlyout height={chartHeight} onChange={this._onFlyoutChange} name={name} value={value}></CustomFlyout>} />
            )}
          />
        }
        height={chartHeight}
        {...domain}
        padding={{ left: 0, right: 0, top: 120, bottom: 0 }}
        theme={VictoryTheme.material}
      >
        <ValueBox name={name} unit={options.unit} {...value} ></ValueBox>
        <VictoryAxis
          offsetX={-1}
          dependentAxis
          crossAxis={false}
          tickFormat={(tick, index, ticks) => { return index === 0 ? '' : tick }}

          tickLabelComponent={(
            <VictoryLabel
              verticalAnchor="middle"
              textAnchor="middle"
              x={12}
            />
          )}
          style={{
            tickLabels: {
              fontSize: 10,
            },
            grid: { stroke: '#f3f3f3', strokeWidth: 1 },
          }}
        />

        <VictoryAxis
          offsetY={chartHeight}
          style={{
            tickLabels: {
              fontSize: 10,
              stroke: '#ccc'
            },
            ticks: {
              stroke: '#ccc'
            },
            grid: { stroke: '#f6f6f6', strokeWidth: 1 },
            axis: { stroke: '#ccc', colorRendering: '#ccc' }
          }}
          orientation='top'
          tickCount={5}
          scale={{ y: 'time' }}
          tickFormat={(tick, index, ticks) => this._getTickFormat(tick, index, ticks)}
          tickLabelComponent={(
            <VictoryLabel
              labelPlacement='vertical'
              verticalAnchor="start"
              textAnchor="middle"
              y={chartHeight - 20}
            />
          )}
        />

        <VictoryLine style={{ data: { stroke: "#192a46", strokeWidth: 2, opacity: .8 } }} data={data} />
      </VictoryChart>}
    </>
  }
}