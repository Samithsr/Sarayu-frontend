import React, { useRef, useEffect, useState } from "react";
import { createChart, LineStyle, TickMarkType } from "lightweight-charts";
import axios from "axios";

const TradeViewGraph = () => {
  const chartContainerRef = useRef(null);
  const [initialData, setInitialData] = useState([]);
  let count = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGraphData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchGraphData = async () => {
    // try {
    //   const res = await axios.get("http://localhost:5000/api/mqtt/messages");
    //   const timestamp = new Date(res.data.message.timestamp).getTime() / 1000;
    //   setInitialData((prevData) => [
    //     ...prevData,
    //     {
    //       value: parseFloat(res.data.message.message),
    //       time: Math.floor(timestamp + count),
    //     },
    //   ]);
    //   count++;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 780,
      layout: {
        background: { color: "#222" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      crosshair: {
        vertLine: {
          width: 5,
          style: LineStyle.Solid,
          color: "#C3BCDB44",
          labelBackgroundColor: "#9B7DFF",
        },
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF",
        },
      },
      localization: {
        locale: "en-BD",
        timeFormatter: (time) => {
          const date = new Date(time * 1000);
          return new Intl.DateTimeFormat(navigator.language, {
            hour: "numeric",
            minute: "numeric",
            month: "short",
            day: "numeric",
            year: "2-digit",
          }).format(date);
        },
      },
    });

    chart.priceScale("right").applyOptions({
      borderColor: "#71649C",
      visible: false,
    });

    chart.priceScale("left").applyOptions({
      borderColor: "#71649C",
      visible: true,
    });

    chart.timeScale().applyOptions({
      borderColor: "#71649C",
      timeVisible: true,
      rightOffset: 20,
      barSpacing: 15,
      minBarSpacing: 5,
      fixLeftEdge: true,
    });

    chart.timeScale().options.tickMarkFormatter = (
      time,
      tickMarkType,
      locale
    ) => {
      const date = new Date(time * 1000);
      switch (tickMarkType) {
        case TickMarkType.Year:
          return date.getFullYear();
        case TickMarkType.Month:
          return new Intl.DateTimeFormat(locale, { month: "short" }).format(
            date
          );
        case TickMarkType.DayOfMonth:
          return date.getDate();
        case TickMarkType.Time:
          return new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
          }).format(date);
        case TickMarkType.TimeWithSeconds:
          return new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }).format(date);
        default:
          return "";
      }
    };

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(0, 150, 136, 0.5)",
      bottomColor: "rgba(0, 150, 136, 0.0)",
      lineColor: "rgb(0, 150, 136)",
      lineWidth: 2,
    });

    areaSeries.setData(initialData);

    const lineSeries = chart.addLineSeries({
      color: "red",
      lineWidth: 2,
      style: LineStyle.Solid,
    });

    const lineData = initialData.map((dataPoint) => ({
      time: dataPoint.time,
      value: 14,
    }));

    lineSeries.setData(lineData);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [initialData]);

  return <div ref={chartContainerRef} style={{ width: "100%" }}></div>;
};

export default TradeViewGraph;
