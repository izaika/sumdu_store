<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = [];

        foreach (Product::all() as $index => $product) {
            $products[$index] = [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'price' => $product->price,
                'categoryId' => $product->category_id,
            ];
        }

        return $this->success(['products' => $products]);
    }

    public function store(Request $request)
    {
        $this->validateRequest($request);
        $product = Product::create([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'price' => $request->get('price'),
            'category_id' => $request->get('categoryId'),
        ]);
        return $this->success([
            "message" => "The product with with id {$product->id} has been created",
            "productId" => $product->id,
        ], 201);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->noProductResponse();
        }
        return $this->success(['product' => [
            'title' => $product->title,
            'description' => $product->description,
            'price' => $product->price,
            'categoryId' => $product->category_id,
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
            'title' => 'required',
            'price' => 'required',
            'categoryId' => 'required',
        ];
        $this->validate($request, $rules);
    }

    public function fileUpload(Request $request)
    {
        $this->validate($request, ['image' => 'required|image|mimes:jpg,jpeg|max:2048']);
        $image = $request->file('image');
        $product_id = $request->get('productId');
        $ext = $image->getClientOriginalExtension();
        $image_destination = $this->getPublicPath("images/$product_id");
        @unlink("$image_destination/image.jpg");
        $image->move($image_destination, "image.jpg");
        // chmod($image_destination, 0777);
        return $this->success(["message" => "Image was uploaded"]);
    }

    private function noProductResponse()
    {
        return $this->fail("The product with {$id} doesn't exist", 404);
    }
}
