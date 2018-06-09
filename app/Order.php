<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'email', 'phone', 'comment', 'status', 'created_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['updated_at'];

    /**
     * Get products for the order.
     */
    public function products()
    {
        return $this->belongsToMany('App\Product')->using('App\OrderProduct');
    }
}
