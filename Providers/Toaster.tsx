"use client";
import { Toaster as ToasterProvider } from "toastrr";

export default function Toaster() {
    return <ToasterProvider closeButton={false} duration={2000} position='top-center' />
}