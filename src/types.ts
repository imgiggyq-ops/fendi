/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  author: string;
  location: string;
  content: string;
  date: string;
  avatarColor: string;
}

export interface CraftDetail {
  id: string;
  name: string;
  description: string;
  culture: string;
  features: string[];
}

export interface ImpactMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface ChartDataPoint {
  year: number;
  index: number;
}
