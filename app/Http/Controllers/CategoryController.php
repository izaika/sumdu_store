<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = [];
        foreach (Category::all() as $index => $category) {
            $categories[$index] = [
                'id' => $category->id,
                'title' => $category->title,
                'updatedAt' => strtotime($category->updated_at),
            ];
        }
        return $this->success(['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $this->validateRequest($request);
        $category = Category::create(['title' => $request->get('title')]);
        return $this->success(["message" => "The category with with id {$category->id} has been created"], 201);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->noCategoryResponse();
        }
        return $this->success(['category' => ['title' => $category->title]]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->noCategoryResponse();
        }

        $this->validateRequest($request);
        $category->title = $request->get('title');
        $category->save();
        return $this->success(["message" => "The category with with id {$category->id} has been updated"]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->noCategoryResponse();
        }
        $category->delete();
        return $this->success(["message" => "The category with with id {$id} has been deleted"]);
    }

    private function validateRequest(Request $request)
    {
        $rules = ['title' => 'required'];
        $this->validate($request, $rules);
    }

    private function noCategoryResponse()
    {
        return $this->fail("The category with {$id} doesn't exist", 404);
    }
}
