<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function index()
    {
        $orders = [];

        foreach (Order::all() as $index => $order) {
            $productsData = $this->getProductsAndPrice($order);

            $orders[$index] = [
                'id' => $order->id,
                'name' => $order->name,
                'email' => $order->email,
                'phone' => $order->phone,
                'comment' => $order->comment,
                'status' => $order->status,
                'totalPrice' => '', // TODO: calculate the price
                'createdAt' => strtotime($order->created_at),
                'products' => $productsData['products'],
                'totalPrice' => $productsData['totalPrice'],
            ];
        }

        return $this->success(['orders' => $orders]);
    }

    public function store(Request $request)
    {
        $this->validateRequest($request);
        $order = Order::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone'),
            'comment' => $request->get('comment'),
            'status' => 0,
        ]);

        $order->products()->sync($request->get('productIds'));

        return $this->success([
            'message' => "Your order ID is {$order->id}. Our managers will contact you soon",
        ], 201);
    }

    public function show($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return $this->noOrderResponse();
        }
        $productsData = $this->getProductsAndPrice($order);
        return $this->success(['order' => [
            'id' => $order->id,
            'name' => $order->name,
            'email' => $order->email,
            'phone' => $order->phone,
            'comment' => $order->comment,
            'status' => $order->status,
            'totalPrice' => $productsData['totalPrice'],
            'products' => $productsData['products'],
            'createdAt' => strtotime($order->created_at),
        ]]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return $this->noOrderResponse();
        }

        $order->status = $request->get('status');
        $order->save();

        return $this->success(["message" => "The order with with id {$order->id} has been updated"]);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return $this->noOrderResponse();
        }
        $order->delete();
        return $this->success(["message" => "The order with with id {$id} has been deleted"]);
    }

    private function getProductsAndPrice(Order $order): array
    {
        $totalPrice = 0;
        $products = [];
        foreach ($order->products as $index => $product) {
            $products[$index] = [
                'id' => $product->id,
                'title' => $product->title,
                'price' => $product->price,
            ];
            $totalPrice += $product->price;
        }

        return ['totalPrice' => $totalPrice, 'products' => $products];
    }

    private function validateRequest(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'productIds' => 'required',
        ];
        $this->validate($request, $rules);
    }

    private function noOrderResponse()
    {
        return $this->fail("The order with {$id} doesn't exist", 404);
    }
}
