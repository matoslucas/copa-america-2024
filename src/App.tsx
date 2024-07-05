import React, { useState } from "react";
import "./index.css";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  Table,
  Switch,
  Breadcrumb,
  Menu,
  Layout,
  theme,
  ConfigProvider,
  Button,
  Alert,
  Checkbox,
  CheckboxProps,
} from "antd";
import {
  MoonOutlined,
  SunOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  TabletTwoTone,
  CopyOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { Content, Footer, Header } from "antd/es/layout/layout";

interface DataType {
  id: string;
  missing: boolean;
  number: number;
  country: string;
  duplicated: boolean;
  red: boolean;
  blue: boolean;
}

const App: React.FC = () => {
  const [stickers, setStickers] = React.useState([] as DataType[]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState(
    [] as React.Key[]
  );

  const getContryFlag = (country: string, size: number = 24) => {
    let displayFlag = true;
    let str = country.substring(0, country.length - 1);

    if (country === "INTR" || country === "HCI" || country === "LEG") {
      displayFlag = false;
    }

    if (country === "CHI") {
      str = "CL";
    }

    if (country === "MEX") {
      str = "MX";
    }
    if (country === "JAM") {
      str = "JM";
    }

    if (country === "URU") {
      str = "UY";
    }

    if (country === "PAR") {
      str = "PY";
    }

    if (country === "HON") {
      str = "HN";
    }

    if (country === "TRI") {
      str = "TT";
    }

    return displayFlag ? (
      <span style={{ fontSize: size }}>{getUnicodeFlagIcon(str)} </span>
    ) : (
      <span>{country}</span>
    );
  };

  const filters: { text: React.JSX.Element; value: string }[] = [];
  stickers.forEach((s) => {
    const found = filters.find((e) => e.value === s.country);
    if (!found) {
      filters.push({ text: getContryFlag(s.country, 18), value: s.country });
    }
  });

  const filters2 = [
    { text: "Collected", value: false },
    { text: "Missing", value: true },
  ];

  const onChange = (
    stiker: DataType,
    key: "red" | "blue" | "duplicated",
    value: boolean
  ) => {
    const updated = stickers.map((s) => {
      if (s.country === stiker.country && s.number === stiker.number) {
        s[key] = value;
      }
      return s;
    });

    localStorage.setItem("album", JSON.stringify(updated));
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Sticker #",
      dataIndex: "id",
      width: "120px",
      key: "id",
      render: (_, record) => {
        const { country, number } = record;
        return `${country} ${number}`;
      },
    },
    Table.SELECTION_COLUMN,
    {
      title: "Missing",
      dataIndex: "missing",
      key: "missing",
      render: (_, record) => {
        const { missing } = record;
        return missing ? (
          <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: 32 }} />
        ) : (
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 32 }} />
        );
      },
      filters: filters2,
      onFilter: (value, record) => record.missing === value,
    },
    {
      title: "Duplicated",
      dataIndex: "duplicated",
      key: "duplicated",
      render: (_, record) => {
        const { blue } = record;
        return (
          <Checkbox
            defaultChecked={blue}
            onChange={(e) => onChange(record, "duplicated", e.target.checked)}
          >
            <CopyOutlined />
          </Checkbox>
        );
      },
    },
    {
      title: "Blue",
      dataIndex: "blue",
      key: "blue",
      render: (_, record) => {
        const { blue } = record;
        return (
          <Checkbox
            defaultChecked={blue}
            onChange={(e) => onChange(record, "blue", e.target.checked)}
          >
            <TabletTwoTone twoToneColor="blue" />
          </Checkbox>
        );
      },
    },
    {
      title: "Red",
      dataIndex: "red",
      key: "red",
      render: (_, record) => {
        const { red } = record;
        return (
          <Checkbox
            defaultChecked={red}
            onChange={(e) => onChange(record, "red", e.target.checked)}
          >
            <TabletTwoTone twoToneColor="red" />
          </Checkbox>
        );
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",

      render: (_, record) => {
        const { country } = record;
        return getContryFlag(country, 32);
      },
      filters,
      onFilter: (value, record) =>
        record.country.indexOf(value as string) === 0,
    },
  ];

  const createAlbum = () => {
    const album = [
      {
        country: "INTR",
        number: 1,
        missing: true,
      },
      {
        country: "INTR",
        number: 2,
        missing: true,
      },
      {
        country: "INTR",
        number: 3,
        missing: true,
      },
      {
        country: "INTR",
        number: 4,
        missing: true,
      },
      {
        country: "HCI",
        number: 1,
        missing: true,
      },
      {
        country: "HCI",
        number: 2,
        missing: true,
      },
      {
        country: "HCI",
        number: 3,
        missing: true,
      },
      {
        country: "HCI",
        number: 4,
        missing: true,
      },
      {
        country: "HCI",
        number: 5,
        missing: true,
      },
      {
        country: "HCI",
        number: 6,
        missing: true,
      },
      {
        country: "HCI",
        number: 7,
        missing: true,
      },
      {
        country: "HCI",
        number: 8,
        missing: true,
      },
      {
        country: "HCI",
        number: 9,
        missing: true,
      },
      {
        country: "HCI",
        number: 10,
        missing: true,
      },
      {
        country: "ARG",
        number: 1,
        missing: true,
      },
      {
        country: "ARG",
        number: 2,
        missing: true,
      },
      {
        country: "ARG",
        number: 3,
        missing: true,
      },
      {
        country: "ARG",
        number: 4,
        missing: true,
      },
      {
        country: "ARG",
        number: 5,
        missing: true,
      },
      {
        country: "ARG",
        number: 6,
        missing: true,
      },
      {
        country: "ARG",
        number: 7,
        missing: true,
      },
      {
        country: "ARG",
        number: 8,
        missing: true,
      },
      {
        country: "ARG",
        number: 9,
        missing: true,
      },
      {
        country: "ARG",
        number: 10,
        missing: true,
      },
      {
        country: "ARG",
        number: 11,
        missing: true,
      },
      {
        country: "ARG",
        number: 12,
        missing: true,
      },
      {
        country: "ARG",
        number: 13,
        missing: true,
      },
      {
        country: "ARG",
        number: 14,
        missing: true,
      },
      {
        country: "ARG",
        number: 15,
        missing: true,
      },
      {
        country: "ARG",
        number: 16,
        missing: true,
      },
      {
        country: "ARG",
        number: 17,
        missing: true,
      },
      {
        country: "ARG",
        number: 18,
        missing: true,
      },
      {
        country: "ARG",
        number: 19,
        missing: true,
      },
      {
        country: "ARG",
        number: 20,
        missing: true,
      },
      {
        country: "ARG",
        number: 21,
        missing: true,
      },
      {
        country: "ARG",
        number: 22,
        missing: true,
      },
      {
        country: "PER",
        number: 1,
        missing: true,
      },
      {
        country: "PER",
        number: 2,
        missing: true,
      },
      {
        country: "PER",
        number: 3,
        missing: true,
      },
      {
        country: "PER",
        number: 4,
        missing: true,
      },
      {
        country: "PER",
        number: 5,
        missing: true,
      },
      {
        country: "PER",
        number: 6,
        missing: true,
      },
      {
        country: "PER",
        number: 7,
        missing: true,
      },
      {
        country: "PER",
        number: 8,
        missing: true,
      },
      {
        country: "PER",
        number: 9,
        missing: true,
      },
      {
        country: "PER",
        number: 10,
        missing: true,
      },
      {
        country: "PER",
        number: 11,
        missing: true,
      },
      {
        country: "PER",
        number: 12,
        missing: true,
      },
      {
        country: "PER",
        number: 13,
        missing: true,
      },
      {
        country: "PER",
        number: 14,
        missing: true,
      },
      {
        country: "PER",
        number: 15,
        missing: true,
      },
      {
        country: "PER",
        number: 16,
        missing: true,
      },
      {
        country: "PER",
        number: 17,
        missing: true,
      },
      {
        country: "PER",
        number: 18,
        missing: true,
      },
      {
        country: "PER",
        number: 19,
        missing: true,
      },
      {
        country: "PER",
        number: 20,
        missing: true,
      },
      {
        country: "PER",
        number: 21,
        missing: true,
      },
      {
        country: "PER",
        number: 22,
        missing: true,
      },
      {
        country: "CHI",
        number: 1,
        missing: true,
      },
      {
        country: "CHI",
        number: 2,
        missing: true,
      },
      {
        country: "CHI",
        number: 3,
        missing: true,
      },
      {
        country: "CHI",
        number: 4,
        missing: true,
      },
      {
        country: "CHI",
        number: 5,
        missing: true,
      },
      {
        country: "CHI",
        number: 6,
        missing: true,
      },
      {
        country: "CHI",
        number: 7,
        missing: true,
      },
      {
        country: "CHI",
        number: 8,
        missing: true,
      },
      {
        country: "CHI",
        number: 9,
        missing: true,
      },
      {
        country: "CHI",
        number: 10,
        missing: true,
      },
      {
        country: "CHI",
        number: 11,
        missing: true,
      },
      {
        country: "CHI",
        number: 12,
        missing: true,
      },
      {
        country: "CHI",
        number: 13,
        missing: true,
      },
      {
        country: "CHI",
        number: 14,
        missing: true,
      },
      {
        country: "CHI",
        number: 15,
        missing: true,
      },
      {
        country: "CHI",
        number: 16,
        missing: true,
      },
      {
        country: "CHI",
        number: 17,
        missing: true,
      },
      {
        country: "CHI",
        number: 18,
        missing: true,
      },
      {
        country: "CHI",
        number: 19,
        missing: true,
      },
      {
        country: "CHI",
        number: 20,
        missing: true,
      },
      {
        country: "CHI",
        number: 21,
        missing: true,
      },
      {
        country: "CHI",
        number: 22,
        missing: true,
      },
      {
        country: "MEX",
        number: 1,
        missing: true,
      },
      {
        country: "MEX",
        number: 2,
        missing: true,
      },
      {
        country: "MEX",
        number: 3,
        missing: true,
      },
      {
        country: "MEX",
        number: 4,
        missing: true,
      },
      {
        country: "MEX",
        number: 5,
        missing: true,
      },
      {
        country: "MEX",
        number: 6,
        missing: true,
      },
      {
        country: "MEX",
        number: 7,
        missing: true,
      },
      {
        country: "MEX",
        number: 8,
        missing: true,
      },
      {
        country: "MEX",
        number: 9,
        missing: true,
      },
      {
        country: "MEX",
        number: 10,
        missing: true,
      },
      {
        country: "MEX",
        number: 11,
        missing: true,
      },
      {
        country: "MEX",
        number: 12,
        missing: true,
      },
      {
        country: "MEX",
        number: 13,
        missing: true,
      },
      {
        country: "MEX",
        number: 14,
        missing: true,
      },
      {
        country: "MEX",
        number: 15,
        missing: true,
      },
      {
        country: "MEX",
        number: 16,
        missing: true,
      },
      {
        country: "MEX",
        number: 17,
        missing: true,
      },
      {
        country: "MEX",
        number: 18,
        missing: true,
      },
      {
        country: "MEX",
        number: 19,
        missing: true,
      },
      {
        country: "MEX",
        number: 20,
        missing: true,
      },
      {
        country: "MEX",
        number: 21,
        missing: true,
      },
      {
        country: "MEX",
        number: 22,
        missing: true,
      },
      {
        country: "ECU",
        number: 1,
        missing: true,
      },
      {
        country: "ECU",
        number: 2,
        missing: true,
      },
      {
        country: "ECU",
        number: 3,
        missing: true,
      },
      {
        country: "ECU",
        number: 4,
        missing: true,
      },
      {
        country: "ECU",
        number: 5,
        missing: true,
      },
      {
        country: "ECU",
        number: 6,
        missing: true,
      },
      {
        country: "ECU",
        number: 7,
        missing: true,
      },
      {
        country: "ECU",
        number: 8,
        missing: true,
      },
      {
        country: "ECU",
        number: 9,
        missing: true,
      },
      {
        country: "ECU",
        number: 10,
        missing: true,
      },
      {
        country: "ECU",
        number: 11,
        missing: true,
      },
      {
        country: "ECU",
        number: 12,
        missing: true,
      },
      {
        country: "ECU",
        number: 13,
        missing: true,
      },
      {
        country: "ECU",
        number: 14,
        missing: true,
      },
      {
        country: "ECU",
        number: 15,
        missing: true,
      },
      {
        country: "ECU",
        number: 16,
        missing: true,
      },
      {
        country: "ECU",
        number: 17,
        missing: true,
      },
      {
        country: "ECU",
        number: 18,
        missing: true,
      },
      {
        country: "ECU",
        number: 19,
        missing: true,
      },
      {
        country: "ECU",
        number: 20,
        missing: true,
      },
      {
        country: "ECU",
        number: 21,
        missing: true,
      },
      {
        country: "ECU",
        number: 22,
        missing: true,
      },
      {
        country: "VEN",
        number: 1,
        missing: true,
      },
      {
        country: "VEN",
        number: 2,
        missing: true,
      },
      {
        country: "VEN",
        number: 3,
        missing: true,
      },
      {
        country: "VEN",
        number: 4,
        missing: true,
      },
      {
        country: "VEN",
        number: 5,
        missing: true,
      },
      {
        country: "VEN",
        number: 6,
        missing: true,
      },
      {
        country: "VEN",
        number: 7,
        missing: true,
      },
      {
        country: "VEN",
        number: 8,
        missing: true,
      },
      {
        country: "VEN",
        number: 9,
        missing: true,
      },
      {
        country: "VEN",
        number: 10,
        missing: true,
      },
      {
        country: "VEN",
        number: 11,
        missing: true,
      },
      {
        country: "VEN",
        number: 12,
        missing: true,
      },
      {
        country: "VEN",
        number: 13,
        missing: true,
      },
      {
        country: "VEN",
        number: 14,
        missing: true,
      },
      {
        country: "VEN",
        number: 15,
        missing: true,
      },
      {
        country: "VEN",
        number: 16,
        missing: true,
      },
      {
        country: "VEN",
        number: 17,
        missing: true,
      },
      {
        country: "VEN",
        number: 18,
        missing: true,
      },
      {
        country: "VEN",
        number: 19,
        missing: true,
      },
      {
        country: "VEN",
        number: 20,
        missing: true,
      },
      {
        country: "VEN",
        number: 21,
        missing: true,
      },
      {
        country: "VEN",
        number: 22,
        missing: true,
      },
      {
        country: "JAM",
        number: 1,
        missing: true,
      },
      {
        country: "JAM",
        number: 2,
        missing: true,
      },
      {
        country: "JAM",
        number: 3,
        missing: true,
      },
      {
        country: "JAM",
        number: 4,
        missing: true,
      },
      {
        country: "JAM",
        number: 5,
        missing: true,
      },
      {
        country: "JAM",
        number: 6,
        missing: true,
      },
      {
        country: "JAM",
        number: 7,
        missing: true,
      },
      {
        country: "JAM",
        number: 8,
        missing: true,
      },
      {
        country: "JAM",
        number: 9,
        missing: true,
      },
      {
        country: "JAM",
        number: 10,
        missing: true,
      },
      {
        country: "JAM",
        number: 11,
        missing: true,
      },
      {
        country: "JAM",
        number: 12,
        missing: true,
      },
      {
        country: "JAM",
        number: 13,
        missing: true,
      },
      {
        country: "JAM",
        number: 14,
        missing: true,
      },
      {
        country: "JAM",
        number: 15,
        missing: true,
      },
      {
        country: "JAM",
        number: 16,
        missing: true,
      },
      {
        country: "JAM",
        number: 17,
        missing: true,
      },
      {
        country: "JAM",
        number: 18,
        missing: true,
      },
      {
        country: "JAM",
        number: 19,
        missing: true,
      },
      {
        country: "JAM",
        number: 20,
        missing: true,
      },
      {
        country: "JAM",
        number: 21,
        missing: true,
      },
      {
        country: "JAM",
        number: 22,
        missing: true,
      },
      {
        country: "USA",
        number: 1,
        missing: true,
      },
      {
        country: "USA",
        number: 2,
        missing: true,
      },
      {
        country: "USA",
        number: 3,
        missing: true,
      },
      {
        country: "USA",
        number: 4,
        missing: true,
      },
      {
        country: "USA",
        number: 5,
        missing: true,
      },
      {
        country: "USA",
        number: 6,
        missing: true,
      },
      {
        country: "USA",
        number: 7,
        missing: true,
      },
      {
        country: "USA",
        number: 8,
        missing: true,
      },
      {
        country: "USA",
        number: 9,
        missing: true,
      },
      {
        country: "USA",
        number: 10,
        missing: true,
      },
      {
        country: "USA",
        number: 11,
        missing: true,
      },
      {
        country: "USA",
        number: 12,
        missing: true,
      },
      {
        country: "USA",
        number: 13,
        missing: true,
      },
      {
        country: "USA",
        number: 14,
        missing: true,
      },
      {
        country: "USA",
        number: 15,
        missing: true,
      },
      {
        country: "USA",
        number: 16,
        missing: true,
      },
      {
        country: "USA",
        number: 17,
        missing: true,
      },
      {
        country: "USA",
        number: 18,
        missing: true,
      },
      {
        country: "USA",
        number: 19,
        missing: true,
      },
      {
        country: "USA",
        number: 20,
        missing: true,
      },
      {
        country: "USA",
        number: 21,
        missing: true,
      },
      {
        country: "USA",
        number: 22,
        missing: true,
      },
      {
        country: "URU",
        number: 1,
        missing: true,
      },
      {
        country: "URU",
        number: 2,
        missing: true,
      },
      {
        country: "URU",
        number: 3,
        missing: true,
      },
      {
        country: "URU",
        number: 4,
        missing: true,
      },
      {
        country: "URU",
        number: 5,
        missing: true,
      },
      {
        country: "URU",
        number: 6,
        missing: true,
      },
      {
        country: "URU",
        number: 7,
        missing: true,
      },
      {
        country: "URU",
        number: 8,
        missing: true,
      },
      {
        country: "URU",
        number: 9,
        missing: true,
      },
      {
        country: "URU",
        number: 10,
        missing: true,
      },
      {
        country: "URU",
        number: 11,
        missing: true,
      },
      {
        country: "URU",
        number: 12,
        missing: true,
      },
      {
        country: "URU",
        number: 13,
        missing: true,
      },
      {
        country: "URU",
        number: 14,
        missing: true,
      },
      {
        country: "URU",
        number: 15,
        missing: true,
      },
      {
        country: "URU",
        number: 16,
        missing: true,
      },
      {
        country: "URU",
        number: 17,
        missing: true,
      },
      {
        country: "URU",
        number: 18,
        missing: true,
      },
      {
        country: "URU",
        number: 19,
        missing: true,
      },
      {
        country: "URU",
        number: 20,
        missing: true,
      },
      {
        country: "URU",
        number: 21,
        missing: true,
      },
      {
        country: "URU",
        number: 22,
        missing: true,
      },
      {
        country: "PAN",
        number: 1,
        missing: true,
      },
      {
        country: "PAN",
        number: 2,
        missing: true,
      },
      {
        country: "PAN",
        number: 3,
        missing: true,
      },
      {
        country: "PAN",
        number: 4,
        missing: true,
      },
      {
        country: "PAN",
        number: 5,
        missing: true,
      },
      {
        country: "PAN",
        number: 6,
        missing: true,
      },
      {
        country: "PAN",
        number: 7,
        missing: true,
      },
      {
        country: "PAN",
        number: 8,
        missing: true,
      },
      {
        country: "PAN",
        number: 9,
        missing: true,
      },
      {
        country: "PAN",
        number: 10,
        missing: true,
      },
      {
        country: "PAN",
        number: 11,
        missing: true,
      },
      {
        country: "PAN",
        number: 12,
        missing: true,
      },
      {
        country: "PAN",
        number: 13,
        missing: true,
      },
      {
        country: "PAN",
        number: 14,
        missing: true,
      },
      {
        country: "PAN",
        number: 15,
        missing: true,
      },
      {
        country: "PAN",
        number: 16,
        missing: true,
      },
      {
        country: "PAN",
        number: 17,
        missing: true,
      },
      {
        country: "PAN",
        number: 18,
        missing: true,
      },
      {
        country: "PAN",
        number: 19,
        missing: true,
      },
      {
        country: "PAN",
        number: 20,
        missing: true,
      },
      {
        country: "PAN",
        number: 21,
        missing: true,
      },
      {
        country: "PAN",
        number: 22,
        missing: true,
      },
      {
        country: "BOL",
        number: 1,
        missing: true,
      },
      {
        country: "BOL",
        number: 2,
        missing: true,
      },
      {
        country: "BOL",
        number: 3,
        missing: true,
      },
      {
        country: "BOL",
        number: 4,
        missing: true,
      },
      {
        country: "BOL",
        number: 5,
        missing: true,
      },
      {
        country: "BOL",
        number: 6,
        missing: true,
      },
      {
        country: "BOL",
        number: 7,
        missing: true,
      },
      {
        country: "BOL",
        number: 8,
        missing: true,
      },
      {
        country: "BOL",
        number: 9,
        missing: true,
      },
      {
        country: "BOL",
        number: 10,
        missing: true,
      },
      {
        country: "BOL",
        number: 11,
        missing: true,
      },
      {
        country: "BOL",
        number: 12,
        missing: true,
      },
      {
        country: "BOL",
        number: 13,
        missing: true,
      },
      {
        country: "BOL",
        number: 14,
        missing: true,
      },
      {
        country: "BOL",
        number: 15,
        missing: true,
      },
      {
        country: "BOL",
        number: 16,
        missing: true,
      },
      {
        country: "BOL",
        number: 17,
        missing: true,
      },
      {
        country: "BOL",
        number: 18,
        missing: true,
      },
      {
        country: "BOL",
        number: 19,
        missing: true,
      },
      {
        country: "BOL",
        number: 20,
        missing: true,
      },
      {
        country: "BOL",
        number: 21,
        missing: true,
      },
      {
        country: "BOL",
        number: 22,
        missing: true,
      },
      {
        country: "BRA",
        number: 1,
        missing: true,
      },
      {
        country: "BRA",
        number: 2,
        missing: true,
      },
      {
        country: "BRA",
        number: 3,
        missing: true,
      },
      {
        country: "BRA",
        number: 4,
        missing: true,
      },
      {
        country: "BRA",
        number: 5,
        missing: true,
      },
      {
        country: "BRA",
        number: 6,
        missing: true,
      },
      {
        country: "BRA",
        number: 7,
        missing: true,
      },
      {
        country: "BRA",
        number: 8,
        missing: true,
      },
      {
        country: "BRA",
        number: 9,
        missing: true,
      },
      {
        country: "BRA",
        number: 10,
        missing: true,
      },
      {
        country: "BRA",
        number: 11,
        missing: true,
      },
      {
        country: "BRA",
        number: 12,
        missing: true,
      },
      {
        country: "BRA",
        number: 13,
        missing: true,
      },
      {
        country: "BRA",
        number: 14,
        missing: true,
      },
      {
        country: "BRA",
        number: 15,
        missing: true,
      },
      {
        country: "BRA",
        number: 16,
        missing: true,
      },
      {
        country: "BRA",
        number: 17,
        missing: true,
      },
      {
        country: "BRA",
        number: 18,
        missing: true,
      },
      {
        country: "BRA",
        number: 19,
        missing: true,
      },
      {
        country: "BRA",
        number: 20,
        missing: true,
      },
      {
        country: "BRA",
        number: 21,
        missing: true,
      },
      {
        country: "BRA",
        number: 22,
        missing: true,
      },
      {
        country: "COL",
        number: 1,
        missing: true,
      },
      {
        country: "COL",
        number: 2,
        missing: true,
      },
      {
        country: "COL",
        number: 3,
        missing: true,
      },
      {
        country: "COL",
        number: 4,
        missing: true,
      },
      {
        country: "COL",
        number: 5,
        missing: true,
      },
      {
        country: "COL",
        number: 6,
        missing: true,
      },
      {
        country: "COL",
        number: 7,
        missing: true,
      },
      {
        country: "COL",
        number: 8,
        missing: true,
      },
      {
        country: "COL",
        number: 9,
        missing: true,
      },
      {
        country: "COL",
        number: 10,
        missing: true,
      },
      {
        country: "COL",
        number: 11,
        missing: true,
      },
      {
        country: "COL",
        number: 12,
        missing: true,
      },
      {
        country: "COL",
        number: 13,
        missing: true,
      },
      {
        country: "COL",
        number: 14,
        missing: true,
      },
      {
        country: "COL",
        number: 15,
        missing: true,
      },
      {
        country: "COL",
        number: 16,
        missing: true,
      },
      {
        country: "COL",
        number: 17,
        missing: true,
      },
      {
        country: "COL",
        number: 18,
        missing: true,
      },
      {
        country: "COL",
        number: 19,
        missing: true,
      },
      {
        country: "COL",
        number: 20,
        missing: true,
      },
      {
        country: "COL",
        number: 21,
        missing: true,
      },
      {
        country: "COL",
        number: 22,
        missing: true,
      },
      {
        country: "PAR",
        number: 1,
        missing: true,
      },
      {
        country: "PAR",
        number: 2,
        missing: true,
      },
      {
        country: "PAR",
        number: 3,
        missing: true,
      },
      {
        country: "PAR",
        number: 4,
        missing: true,
      },
      {
        country: "PAR",
        number: 5,
        missing: true,
      },
      {
        country: "PAR",
        number: 6,
        missing: true,
      },
      {
        country: "PAR",
        number: 7,
        missing: true,
      },
      {
        country: "PAR",
        number: 8,
        missing: true,
      },
      {
        country: "PAR",
        number: 9,
        missing: true,
      },
      {
        country: "PAR",
        number: 10,
        missing: true,
      },
      {
        country: "PAR",
        number: 11,
        missing: true,
      },
      {
        country: "PAR",
        number: 12,
        missing: true,
      },
      {
        country: "PAR",
        number: 13,
        missing: true,
      },
      {
        country: "PAR",
        number: 14,
        missing: true,
      },
      {
        country: "PAR",
        number: 15,
        missing: true,
      },
      {
        country: "PAR",
        number: 16,
        missing: true,
      },
      {
        country: "PAR",
        number: 17,
        missing: true,
      },
      {
        country: "PAR",
        number: 18,
        missing: true,
      },
      {
        country: "PAR",
        number: 19,
        missing: true,
      },
      {
        country: "PAR",
        number: 20,
        missing: true,
      },
      {
        country: "PAR",
        number: 21,
        missing: true,
      },
      {
        country: "PAR",
        number: 22,
        missing: true,
      },
      {
        country: "CAN",
        number: 1,
        missing: true,
      },
      {
        country: "CAN",
        number: 2,
        missing: true,
      },
      {
        country: "CAN",
        number: 3,
        missing: true,
      },
      {
        country: "CAN",
        number: 4,
        missing: true,
      },
      {
        country: "CAN",
        number: 5,
        missing: true,
      },
      {
        country: "CAN",
        number: 6,
        missing: true,
      },
      {
        country: "CAN",
        number: 7,
        missing: true,
      },
      {
        country: "CAN",
        number: 8,
        missing: true,
      },
      {
        country: "CAN",
        number: 9,
        missing: true,
      },
      {
        country: "CAN",
        number: 10,
        missing: true,
      },
      {
        country: "CAN",
        number: 11,
        missing: true,
      },
      {
        country: "CAN",
        number: 12,
        missing: true,
      },
      {
        country: "CAN",
        number: 13,
        missing: true,
      },
      {
        country: "CAN",
        number: 14,
        missing: true,
      },
      {
        country: "CAN",
        number: 15,
        missing: true,
      },
      {
        country: "CAN",
        number: 16,
        missing: true,
      },
      {
        country: "CAN",
        number: 17,
        missing: true,
      },
      {
        country: "CAN",
        number: 18,
        missing: true,
      },
      {
        country: "CAN",
        number: 19,
        missing: true,
      },
      {
        country: "CAN",
        number: 20,
        missing: true,
      },
      {
        country: "CAN",
        number: 21,
        missing: true,
      },
      {
        country: "CAN",
        number: 22,
        missing: true,
      },
      {
        country: "CRC",
        number: 1,
        missing: true,
      },
      {
        country: "CRC",
        number: 2,
        missing: true,
      },
      {
        country: "CRC",
        number: 3,
        missing: true,
      },
      {
        country: "CRC",
        number: 4,
        missing: true,
      },
      {
        country: "CRC",
        number: 5,
        missing: true,
      },
      {
        country: "CRC",
        number: 6,
        missing: true,
      },
      {
        country: "CRC",
        number: 7,
        missing: true,
      },
      {
        country: "CRC",
        number: 8,
        missing: true,
      },
      {
        country: "CRC",
        number: 9,
        missing: true,
      },
      {
        country: "CRC",
        number: 10,
        missing: true,
      },
      {
        country: "CRC",
        number: 11,
        missing: true,
      },
      {
        country: "CRC",
        number: 12,
        missing: true,
      },
      {
        country: "CRC",
        number: 13,
        missing: true,
      },
      {
        country: "CRC",
        number: 14,
        missing: true,
      },
      {
        country: "CRC",
        number: 15,
        missing: true,
      },
      {
        country: "CRC",
        number: 16,
        missing: true,
      },
      {
        country: "CRC",
        number: 17,
        missing: true,
      },
      {
        country: "CRC",
        number: 18,
        missing: true,
      },
      {
        country: "CRC",
        number: 19,
        missing: true,
      },
      {
        country: "CRC",
        number: 20,
        missing: true,
      },
      {
        country: "CRC",
        number: 21,
        missing: true,
      },
      {
        country: "CRC",
        number: 22,
        missing: true,
      },
      {
        country: "HON",
        number: 1,
        missing: true,
      },
      {
        country: "HON",
        number: 2,
        missing: true,
      },
      {
        country: "HON",
        number: 3,
        missing: true,
      },
      {
        country: "HON",
        number: 4,
        missing: true,
      },
      {
        country: "HON",
        number: 5,
        missing: true,
      },
      {
        country: "HON",
        number: 6,
        missing: true,
      },
      {
        country: "HON",
        number: 7,
        missing: true,
      },
      {
        country: "HON",
        number: 8,
        missing: true,
      },
      {
        country: "HON",
        number: 9,
        missing: true,
      },
      {
        country: "HON",
        number: 10,
        missing: true,
      },
      {
        country: "HON",
        number: 11,
        missing: true,
      },
      {
        country: "HON",
        number: 12,
        missing: true,
      },
      {
        country: "HON",
        number: 13,
        missing: true,
      },
      {
        country: "HON",
        number: 14,
        missing: true,
      },
      {
        country: "HON",
        number: 15,
        missing: true,
      },
      {
        country: "HON",
        number: 16,
        missing: true,
      },
      {
        country: "HON",
        number: 17,
        missing: true,
      },
      {
        country: "HON",
        number: 18,
        missing: true,
      },
      {
        country: "HON",
        number: 19,
        missing: true,
      },
      {
        country: "HON",
        number: 20,
        missing: true,
      },
      {
        country: "HON",
        number: 21,
        missing: true,
      },
      {
        country: "HON",
        number: 22,
        missing: true,
      },
      {
        country: "TRI",
        number: 1,
        missing: true,
      },
      {
        country: "TRI",
        number: 2,
        missing: true,
      },
      {
        country: "TRI",
        number: 3,
        missing: true,
      },
      {
        country: "TRI",
        number: 4,
        missing: true,
      },
      {
        country: "TRI",
        number: 5,
        missing: true,
      },
      {
        country: "TRI",
        number: 6,
        missing: true,
      },
      {
        country: "TRI",
        number: 7,
        missing: true,
      },
      {
        country: "TRI",
        number: 8,
        missing: true,
      },
      {
        country: "TRI",
        number: 9,
        missing: true,
      },
      {
        country: "TRI",
        number: 10,
        missing: true,
      },
      {
        country: "TRI",
        number: 11,
        missing: true,
      },
      {
        country: "TRI",
        number: 12,
        missing: true,
      },
      {
        country: "TRI",
        number: 13,
        missing: true,
      },
      {
        country: "TRI",
        number: 14,
        missing: true,
      },
      {
        country: "TRI",
        number: 15,
        missing: true,
      },
      {
        country: "TRI",
        number: 16,
        missing: true,
      },
      {
        country: "TRI",
        number: 17,
        missing: true,
      },
      {
        country: "TRI",
        number: 18,
        missing: true,
      },
      {
        country: "TRI",
        number: 19,
        missing: true,
      },
      {
        country: "TRI",
        number: 20,
        missing: true,
      },
      {
        country: "TRI",
        number: 21,
        missing: true,
      },
      {
        country: "TRI",
        number: 22,
        missing: true,
      },
      {
        country: "LEG",
        number: 1,
        missing: true,
      },
      {
        country: "LEG",
        number: 2,
        missing: true,
      },
      {
        country: "LEG",
        number: 3,
        missing: true,
      },
      {
        country: "LEG",
        number: 4,
        missing: true,
      },
      {
        country: "LEG",
        number: 5,
        missing: true,
      },
      {
        country: "LEG",
        number: 6,
        missing: true,
      },
      {
        country: "LEG",
        number: 7,
        missing: true,
      },
      {
        country: "LEG",
        number: 8,
        missing: true,
      },
      {
        country: "LEG",
        number: 9,
        missing: true,
      },
      {
        country: "LEG",
        number: 10,
        missing: true,
      },
      {
        country: "LEG",
        number: 11,
        missing: true,
      },
      {
        country: "LEG",
        number: 12,
        missing: true,
      },
      {
        country: "LEG",
        number: 13,
        missing: true,
      },
      {
        country: "LEG",
        number: 14,
        missing: true,
      },
      {
        country: "LEG",
        number: 15,
        missing: true,
      },
      {
        country: "LEG",
        number: 16,
        missing: true,
      },
      {
        country: "LEG",
        number: 17,
        missing: true,
      },
      {
        country: "LEG",
        number: 18,
        missing: true,
      },
    ].map((s) => {
      const n = s as DataType;

      n.duplicated = false;
      n.red = false;
      n.blue = false;
      return n;
    });
    localStorage.setItem("album", JSON.stringify(album));
    return album;
  };

  const getRowKey = (record: DataType) => {
    const { country, number } = record;
    return `${country}_${number}`;
  };

  const loadAlbum = (stickers: any) => {
    const selected = stickers
      .filter((i: DataType) => !i.missing)
      .map(getRowKey);

    setSelectedRowKeys(selected);
    setStickers(stickers);
  };

  const validateAlbum = (stickers: DataType[]) => {
    return stickers.map((s) => {
      if (!s["duplicated"]) {
        s.duplicated = false;
      }
      if (!s["red"]) {
        s.red = false;
      }

      if (!s["blue"]) {
        s.blue = false;
      }

      return s;
    });
  };

  React.useEffect(() => {
    const result = localStorage.getItem("album");
    if (result) {
      loadAlbum(validateAlbum(JSON.parse(result)));
    } else {
      loadAlbum(createAlbum());
    }
  }, []);

  const rowSelectionConfig: TableRowSelection<DataType> = {
    //columnTitle: "#",

    hideSelectAll: true,

    selectedRowKeys,

    onChange: (selectedRowKeys, selectedRows) => {
      const updated = stickers.map((s) => {
        const { country, number } = s;
        const found = selectedRows.find(
          (e) => e.country === country && e.number === number
        );

        if (found) {
          s.missing = false;
        } else {
          s.missing = true;
        }
        return s;
      });

      localStorage.setItem("album", JSON.stringify(updated));

      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [{ key: "copa-america-2024", label: `Copa America 2024` }];

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />

          <Switch
            onChange={handleClick}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            defaultChecked
          />
        </Header>
        <Content
          style={{
            padding: "0 12px",
            backgroundColor: isDarkMode ? "black" : "#c3d9f7",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Album</Breadcrumb.Item>
          </Breadcrumb>

          <Table
            title={() => {
              let missing_counter = 0;
              const missing_list: string[] = [];

              stickers.forEach((stiker: DataType) => {
                const { missing } = stiker;

                if (missing) {
                  missing_counter++;
                  missing_list.push(getRowKey(stiker));
                }
              });
              return (
                <Alert
                  message={
                    <span>
                      Missing: <b>{missing_counter}</b> of
                      <b>{stickers.length}</b>
                    </span>
                  }
                  description={<pre>{missing_list.join("\n")}</pre>}
                  type="info"
                  showIcon
                />
              );
            }}
            columns={columns}
            rowSelection={rowSelectionConfig}
            dataSource={stickers}
            rowKey={(record) => getRowKey(record)}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Collectible Figures ©{new Date().getFullYear()} Created by Lucas
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
