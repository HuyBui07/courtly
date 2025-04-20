package controllers

import (
	"net/http"

	"log"
	"time"

	"github.com/payOSHQ/payos-lib-golang"
)

type PayOSRequest struct {
	OrderCode   string `json:"orderCode"`
	Amount      int    `json:"amount"`
	Description string `json:"description"`
	ReturnURL   string `json:"returnUrl"`
	CancelURL   string `json:"cancelUrl"`
	Signature   string `json:"signature"`
}

type PayOSResponse struct {
	CheckoutURL string `json:"checkoutUrl"`
}

func CreatePaymentHandler(w http.ResponseWriter, r *http.Request) {
	domain := "http://localhost:8080/"
	paymentLinkRequest := payos.CheckoutRequestType{
		OrderCode:   time.Now().UnixNano() / int64(time.Millisecond),
		Amount:      2000,
		Description: "Thanh toan don hang",
		Items: []payos.Item{{
			Name:     "Court 1 (10h30 - 12h00)",
			Quantity: 1,
			Price:    2000,
		}, {
			Name:     "Court 2 (10h30 - 12h00)",
			Quantity: 1,
			Price:    2000,
		}},
		CancelUrl: domain + "cancel",
		ReturnUrl: domain + "success",
	}

	paymentLinkResponse, err := payos.CreatePaymentLink(paymentLinkRequest)

	if err != nil {
		log.Printf("Create payment link failed: %v", err)
	}

	http.Redirect(w, r, paymentLinkResponse.CheckoutUrl, http.StatusSeeOther)
}
