import React, { Component } from "react";
import { VictorySharedEvents, VictoryPie } from "victory";

export default class DataViz extends Component {
  render() {
    const cart = this.props.cart;

    // There is probably (surely..) a better way of doing this...
    // 1. Loop through array and get a count of colour.
    let colour_count = {};
    let chartData = [];
    for (let item of cart) {
      if (item.colour in colour_count) {
        colour_count[item.colour] += 1;
      } else {
        colour_count[item.colour] = 1;
      }
    }
    // 2. Iterate over the summarized object to put into list for the charts.
    Object.keys(colour_count).forEach(function(colour) {
      chartData.push({ x: colour, y: colour_count[colour] });
    });

    return (
      <svg width={800} height={500}>
        <VictorySharedEvents
          events={[
            {
              childName: ["pie"],
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      childName: ["pie"],
                      mutation: props => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: "tomato"
                          })
                        };
                      }
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      childName: ["pie"],
                      mutation: () => {
                        return null;
                      }
                    }
                  ];
                }
              }
            }
          ]}
        >
          <g>
            <VictoryPie
              width={800}
              name="pie"
              standalone={false}
              style={{ labels: { fontSize: 25, padding: 10 } }}
              data={chartData}
            />
          </g>
        </VictorySharedEvents>
      </svg>
    );
  }
}
