<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = [];

        foreach (Order::all() as $index => $orders) {
            $orders[$index] = [
                'id' => $order->id,
                'name' => $order->name,
                'email' => $order->email,
                'phone' => $order->phone,
                'comment' => $order->comment,
                'status' => $order->status,
                'totalPrice' => '', // TODO: calculate the price
                'createdAt' => $order->created_at,
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
        return $this->success(['order' => [
            'id' => $order->id,
            'name' => $order->name,
            'email' => $order->email,
            'phone' => $order->phone,
            'comment' => $order->comment,
            'status' => $order->status,
            'totalPrice' => '', // TODO: calculate the price,
            'products' => '', //$order->products
            'createdAt' => $order->created_at,
        ]]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->noProductResponse();
        }

        $this->validateRequest($request);
        $product->title = $request->get('title');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->category_id = $request->get('categoryId');
        $product->save();

        return $this->success(["message" => "The product with with id {$product->id} has been updated"]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->noProductResponse();
        }
        $product->delete();
        return $this->success(["message" => "The product with with id {$id} has been deleted"]);
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
