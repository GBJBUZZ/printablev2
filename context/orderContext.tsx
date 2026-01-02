"use client";

import type React from "react";

import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface DocumentItem {
  fileName: string;
  fileUrl: string;
  copies: number;
  colorType: "black and white" | "color";
  paperSize:
    | "Letter (8.5 x 11 inches)"
    | "A4 (8.27 x 11.69 inches)"
    | "Legal (8.5 x 14 inches)";
  printType: "front" | "front and back";
  pageDirection: "vertical" | "horizontal";
  pagesToPrint: "All" | string;
  id: string;
  size: number;
  uploading?: boolean;
  error?: string;
}

export interface Order {
  userId: string;
  merchantId: string;
  status: "declined" | "pending" | "accepted" | string;
  totalAmount: number;
  paymentMethod: string;
  fulfillmentType: "takeaway" | "delivery" | string;
  state: string | null;
  city: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  documents: DocumentItem[];
}

type Action =
  | { type: "SET_ORDER"; payload: Order }
  | { type: "ADD_DOCUMENT"; payload: DocumentItem }
  | { type: "REMOVE_DOCUMENT"; index: number }
  | { type: "UPDATE_DOCUMENT"; index: number; payload: DocumentItem }
  | {
      type: "UPDATE_FIELD";
      field: keyof Omit<Order, "documents">;
      payload: any;
    };

const initialOrder: Order = {
  userId: "1",
  merchantId: "1",
  status: "pending",
  totalAmount: 320,
  paymentMethod: "Credit Card",
  fulfillmentType: "takeaway",
  state: null,
  city: null,
  address: null,
  latitude: null,
  longitude: null,
  documents: [],
};

function orderReducer(state: Order, action: Action): Order {
  switch (action.type) {
    case "SET_ORDER":
      return action.payload;
    case "ADD_DOCUMENT":
      return { ...state, documents: [...state.documents, action.payload] };
    case "REMOVE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter((_, i) => i !== action.index),
      };
    case "UPDATE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.map((doc, i) =>
          i === action.index ? action.payload : doc,
        ),
      };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.payload } as Order;
    default:
      return state;
  }
}

interface ContextType {
  order: Order;
  dispatch: React.Dispatch<Action>;
}

const OrderContext = createContext<ContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrder);

  return (
    <OrderContext.Provider value={{ order, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder(): ContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
