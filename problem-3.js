const payments = [];

function generateRandomTransaction() {
  const id = Math.floor(Math.random() * 1000);
  const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

  return {
    id,
    amount,
    attemptCount: 0,
    status: "pending", // pending, success, failed, disabled
    nextRetryAt: null,
    timestamp: new Date().toISOString(),
  };
}

setInterval(() => {
  const trx = generateRandomTransaction();
  payments.push(trx);
}, 1000);

const retryDelays = [2, 5, 10, 20, 30, 60];

function getNextProcessablePayment() {
  const now = new Date();
  return payments.find(
    (payment) =>
      (payment.status === "pending" || payment.status === "failed") &&
      (!payment.nextRetryAt || new Date(payment.nextRetryAt) <= now)
  );
}

function processNextPayment() {
  const payment = getNextProcessablePayment();
  if (!payment) return;

  const randomId = Math.floor(Math.random() * 1000);

  if (payment.id === randomId) {
    payment.status = "success";
    payment.nextRetryAt = null;
    console.log("Payment succeeded:", payment);
  } else {
    payment.status = "failed";
    payment.attemptCount += 1;

    if (payment.attemptCount <= retryDelays.length) {
      const delayMinutes = retryDelays[payment.attemptCount - 1];

      const nextRetry = new Date(Date.now() + delayMinutes * 1000);

      payment.nextRetryAt = nextRetry.toISOString();

      console.log(`Payment failed, will retry after ${delayMinutes}min:`, payment);
    } else {
      payment.status = "disabled";
      payment.nextRetryAt = null;
      console.log("Payment disabled after too many attempts:", payment);
    }
  }
}

setInterval(processNextPayment, 1000);
