# 迅策系统代码库理解

## 概述

目前迅策系统包含有：Rel、OMS、BMS、RMS、Utility、Tunnel、IRS、IRS-FRONT、UDS、OMS-FRONT。

在2018年初，后端模块及代码库有进行变更的考虑。这里只描述现有的情况，便于组内整体理解。

后续如果有变更，再重新补充到该文档。

## Rel
整体的版本，实施那边会用到，开发这边看这个没有太多用处。
可以理解为，其他所有版本汇总，打包出一个Rel，并标明版本。

## OMS
主要用做实时交易相关。

## BMS
主要用做报表数据相关。

## RMS
主要用做风控相关。

## Utility
主要用做文件导入导出相关

## Tunnel
即live-tunnel，使用socket.io来提供实时的数据更新的提醒。3.17.0版本开始已经由前端承担开发与维护任务。

## IRS
主要用做投研相关。仅包含后台代码

## IRS-FRONT
主要用做投研相关。仅包含前端代码

## UDS
底层券商适配模块

## OMS-FRONT
前端主要代码，包含与OMS、BMS、RMS等对接的逻辑。