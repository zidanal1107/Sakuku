/**
 * Fungsi untuk mengubah angka mentah menjadi format mata uang Rupiah
 * Contoh: 50000 -> Rp 50.000
 */
export const formatRupiah = (number) => {
  if (isNaN(number)) return "Rp 0";
  
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};