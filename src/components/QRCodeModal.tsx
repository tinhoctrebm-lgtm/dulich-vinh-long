import React, { useEffect, useState, useRef } from 'react';
import { LocationItem } from '../types/tourism';
import QRCode from 'qrcode';
import { X, Download, Printer, Copy, Check, QrCode, ExternalLink, Sparkles } from 'lucide-react';

interface QRCodeModalProps {
  location: LocationItem;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ location, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Real URL to the location detail
  const fullUrl = `${window.location.origin}${window.location.pathname}#/place/${location.id}`;

  useEffect(() => {
    QRCode.toDataURL(fullUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#064e3b', // Deep emerald color
        light: '#ffffff',
      },
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('Lỗi sinh mã QR:', err));
  }, [fullUrl]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-Du-Lich-${location.id}.png`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 mb-3">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Mã QR Thuyết minh & Tra cứu
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Quét mã để truy cập trực tiếp bài thuyết minh và tư liệu di tích
          </p>
        </div>

        {/* Printable Card Area */}
        <div 
          ref={printAreaRef}
          className="bg-stone-50 border-2 border-dashed border-emerald-300 rounded-2xl p-5 text-center mb-6 print:border-solid print:p-8"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            DU LỊCH VĨNH LONG THÔNG MINH
          </div>
          <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 mb-3">
            {location.name}
          </h4>

          {/* QR Image */}
          <div className="flex justify-center my-2">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`Mã QR cho ${location.name}`}
                className="w-48 h-48 rounded-xl shadow-xs border border-stone-200 bg-white p-2"
              />
            ) : (
              <div className="w-48 h-48 rounded-xl bg-stone-200 animate-pulse flex items-center justify-center text-xs text-stone-400">
                Đang tạo mã QR...
              </div>
            )}
          </div>

          <div className="text-[11px] text-stone-600 mt-2 italic">
            Hướng dẫn: Sử dụng máy ảnh điện thoại hoặc Zalo để quét mã và nghe thuyết minh tự động.
          </div>
          <div className="text-[10px] text-stone-400 font-mono mt-1 break-all">
            {fullUrl}
          </div>
        </div>

        {/* Action Buttons: Download, Print, Copy */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Tải ảnh PNG</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In mã QR</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Đã sao chép đường dẫn thực tế</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép liên kết điểm đến</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
