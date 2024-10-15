function filterOrdersByPeriod(orders, period) {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    switch (period) {
      case "Bir Kun":
        return orderDate >= startOfDay;
      case "Bir Ha'pte":
        return orderDate >= startOfWeek;
      case "Bir Ay":
        return orderDate >= startOfMonth;
      case "Bir Jil":
        return orderDate >= startOfYear;
      default:
        return true; // Return all orders if period is not recognized
    }
  });
}
export default filterOrdersByPeriod;
